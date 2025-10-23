import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { getTarefasAPI, createTarefaAPI, updateTarefaAPI, deleteTarefaAPI } from '../../../servicos/TarefaServico';
import { getProjetosAPI } from '../../../servicos/ProjetoServico';

export default function Tarefa() {
    const [tarefas, setTarefas] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [show, setShow] = useState(false);
    const [tarefa, setTarefa] = useState({ codigo: 0, titulo: '', descricao: '', status: 'pendente', prioridade: 'media', projeto_codigo: '' });
    const [editando, setEditando] = useState(false);

    const statusOptions = ['pendente', 'em_andamento', 'concluida', 'cancelada'];
    const prioridadeOptions = ['baixa', 'media', 'alta', 'urgente'];

    const statusColors = {
        pendente: 'secondary',
        em_andamento: 'primary',
        concluida: 'success',
        cancelada: 'danger'
    };

    const prioridadeColors = {
        baixa: 'info',
        media: 'warning',
        alta: 'orange',
        urgente: 'danger'
    };

    useEffect(() => {
        carregarTarefas();
        carregarProjetos();
    }, []);

    const carregarTarefas = async () => {
        const data = await getTarefasAPI();
        setTarefas(Array.isArray(data) ? data : []);
    };

    const carregarProjetos = async () => {
        const data = await getProjetosAPI();
        setProjetos(Array.isArray(data) ? data : []);
    };

    const handleClose = () => {
        setShow(false);
        setTarefa({ codigo: 0, titulo: '', descricao: '', status: 'pendente', prioridade: 'media', projeto_codigo: '' });
        setEditando(false);
    };

    const handleShow = () => setShow(true);

    const handleSalvar = async () => {
        if (editando) {
            await updateTarefaAPI(tarefa);
        } else {
            await createTarefaAPI(tarefa);
        }
        handleClose();
        carregarTarefas();
    };

    const handleEditar = (tar) => {
        setTarefa(tar);
        setEditando(true);
        handleShow();
    };

    const handleExcluir = async (codigo) => {
        if (window.confirm('Deseja excluir esta tarefa?')) {
            await deleteTarefaAPI(codigo);
            carregarTarefas();
        }
    };

    const getNomeProjeto = (codigo) => {
        const projeto = projetos.find(p => p.codigo === codigo);
        return projeto ? projeto.nome : 'N/A';
    };

    return (
        <Container className="mt-4">
            <h2>Tarefas</h2>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                <i className="bi bi-plus-circle"></i> Nova Tarefa
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Projeto</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tar => (
                        <tr key={tar.codigo}>
                            <td>{tar.codigo}</td>
                            <td>{tar.titulo}</td>
                            <td>{getNomeProjeto(tar.projeto_codigo)}</td>
                            <td><Badge bg={statusColors[tar.status]}>{tar.status}</Badge></td>
                            <td><Badge bg={prioridadeColors[tar.prioridade]}>{tar.prioridade}</Badge></td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEditar(tar)} className="me-2">
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleExcluir(tar.codigo)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar' : 'Nova'} Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={tarefa.titulo}
                                onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={tarefa.descricao}
                                onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Projeto</Form.Label>
                            <Form.Select
                                value={tarefa.projeto_codigo}
                                onChange={(e) => setTarefa({ ...tarefa, projeto_codigo: parseInt(e.target.value) })}
                            >
                                <option value="">Selecione um projeto</option>
                                {projetos.map(proj => (
                                    <option key={proj.codigo} value={proj.codigo}>{proj.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={tarefa.status}
                                onChange={(e) => setTarefa({ ...tarefa, status: e.target.value })}
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prioridade</Form.Label>
                            <Form.Select
                                value={tarefa.prioridade}
                                onChange={(e) => setTarefa({ ...tarefa, prioridade: e.target.value })}
                            >
                                {prioridadeOptions.map(prioridade => (
                                    <option key={prioridade} value={prioridade}>{prioridade}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
