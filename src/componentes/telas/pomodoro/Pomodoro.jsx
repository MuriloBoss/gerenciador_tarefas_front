import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Modal } from 'react-bootstrap';
import { getProjetosAPI } from '../../../servicos/ProjetoServico';
import { getTarefasProjetoAPI, createTarefaAPI, updateTarefaAPI } from '../../../servicos/TarefaServico';
import { createPomodoroAPI, updatePomodoroAPI } from '../../../servicos/PomodoroServico';

export default function Pomodoro() {
    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [tarefaSelecionada, setTarefaSelecionada] = useState('');
    const [timer, setTimer] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [ciclos, setCiclos] = useState(0);
    const [pomodoroAtual, setPomodoroAtual] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '', status: 'pendente', prioridade: 'media', projeto_codigo: '' });

    useEffect(() => {
        carregarProjetos();
    }, []);

    useEffect(() => {
        if (projetoSelecionado) {
            carregarTarefas(projetoSelecionado);
        }
    }, [projetoSelecionado]);

    useEffect(() => {
        let interval;
        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const carregarProjetos = async () => {
        const data = await getProjetosAPI();
        setProjetos(Array.isArray(data) ? data : []);
    };

    const carregarTarefas = async (projeto_codigo) => {
        const data = await getTarefasProjetoAPI(projeto_codigo);
        setTarefas(Array.isArray(data) ? data : []);
    };

    const handleTimerComplete = async () => {
        setIsRunning(false);
        if (!isBreak) {
            const novoCiclo = ciclos + 1;
            setCiclos(novoCiclo);
            if (pomodoroAtual) {
                await updatePomodoroAPI(pomodoroAtual, { ciclos_completados: novoCiclo });
            }
            setTimer(5 * 60);
            setIsBreak(true);
        } else {
            setTimer(25 * 60);
            setIsBreak(false);
        }
    };

    const handleStart = async () => {
        if (!tarefaSelecionada) {
            alert('Selecione uma tarefa');
            return;
        }
        if (!pomodoroAtual) {
            const pomodoro = await createPomodoroAPI({
                tarefa_codigo: parseInt(tarefaSelecionada),
                duracao_trabalho: 25,
                duracao_pausa: 5
            });
            setPomodoroAtual(pomodoro.codigo);
        }
        setIsRunning(true);
    };

    const handlePause = () => setIsRunning(false);

    const handleReset = () => {
        setIsRunning(false);
        setTimer(25 * 60);
        setIsBreak(false);
        setCiclos(0);
        setPomodoroAtual(null);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAdicionarTarefa = async () => {
        if (!projetoSelecionado) {
            alert('Selecione um projeto primeiro');
            return;
        }
        await createTarefaAPI({ ...novaTarefa, projeto_codigo: parseInt(projetoSelecionado) });
        setShowModal(false);
        setNovaTarefa({ titulo: '', descricao: '', status: 'pendente', prioridade: 'media', projeto_codigo: '' });
        carregarTarefas(projetoSelecionado);
    };

    return (
        <Container className="mt-4">
            <h2>Pomodoro Timer</h2>
            <Row className="mt-4">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Projeto</Form.Label>
                        <Form.Select
                            value={projetoSelecionado}
                            onChange={(e) => {
                                setProjetoSelecionado(e.target.value);
                                setTarefaSelecionada('');
                            }}
                        >
                            <option value="">Selecione um projeto</option>
                            {projetos.map(proj => (
                                <option key={proj.codigo} value={proj.codigo}>{proj.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tarefas do Projeto</Form.Label>
                        <div className="d-flex justify-content-end mb-2">
                            <Button variant="success" size="sm" onClick={() => setShowModal(true)} disabled={!projetoSelecionado}>
                                <i className="bi bi-plus"></i> Nova Tarefa
                            </Button>
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '4px', padding: '10px' }}>
                            {tarefas.length === 0 ? (
                                <p className="text-muted">Nenhuma tarefa encontrada</p>
                            ) : (
                                tarefas.map(tar => (
                                    <div key={tar.codigo} className="d-flex align-items-center mb-2 p-2 border rounded">
                                        <Form.Check
                                            type="radio"
                                            name="tarefa"
                                            id={`tarefa-${tar.codigo}`}
                                            checked={tarefaSelecionada === tar.codigo.toString()}
                                            onChange={() => setTarefaSelecionada(tar.codigo.toString())}
                                            className="me-2"
                                        />
                                        <label htmlFor={`tarefa-${tar.codigo}`} className="flex-grow-1" style={{ cursor: 'pointer', textDecoration: tar.status === 'concluida' ? 'line-through' : 'none' }}>
                                            {tar.titulo}
                                        </label>
                                        <Form.Check
                                            type="checkbox"
                                            checked={tar.status === 'concluida'}
                                            onChange={async (e) => {
                                                await updateTarefaAPI({ ...tar, status: e.target.checked ? 'concluida' : 'pendente' });
                                                carregarTarefas(projetoSelecionado);
                                            }}
                                            title="Marcar como concluída"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Badge bg={isBreak ? 'success' : 'primary'} className="mb-3">
                                {isBreak ? 'Pausa' : 'Trabalho'}
                            </Badge>
                            <h1 className="display-1">{formatTime(timer)}</h1>
                            <h4>Ciclos: {ciclos}</h4>
                            <div className="mt-3">
                                {!isRunning ? (
                                    <Button variant="success" onClick={handleStart} className="me-2">
                                        <i className="bi bi-play-fill"></i> Iniciar
                                    </Button>
                                ) : (
                                    <Button variant="warning" onClick={handlePause} className="me-2">
                                        <i className="bi bi-pause-fill"></i> Pausar
                                    </Button>
                                )}
                                <Button variant="danger" onClick={handleReset}>
                                    <i className="bi bi-arrow-clockwise"></i> Resetar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={novaTarefa.titulo}
                                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={novaTarefa.descricao}
                                onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Select
                                value={novaTarefa.prioridade}
                                onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })}
                            >
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                                <option value="urgente">Urgente</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleAdicionarTarefa}>Adicionar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
