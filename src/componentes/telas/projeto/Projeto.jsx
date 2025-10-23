import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { getProjetosAPI, createProjetoAPI, updateProjetoAPI, deleteProjetoAPI } from '../../../servicos/ProjetoServico';

export default function Projeto() {
    const [projetos, setProjetos] = useState([]);
    const [show, setShow] = useState(false);
    const [projeto, setProjeto] = useState({ codigo: 0, nome: '', descricao: '', usuario_codigo: 1 });
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        carregarProjetos();
    }, []);

    const carregarProjetos = async () => {
        const data = await getProjetosAPI();
        setProjetos(Array.isArray(data) ? data : []);
    };

    const handleClose = () => {
        setShow(false);
        setProjeto({ codigo: 0, nome: '', descricao: '', usuario_codigo: 1 });
        setEditando(false);
    };

    const handleShow = () => setShow(true);

    const handleSalvar = async () => {
        if (editando) {
            await updateProjetoAPI(projeto);
        } else {
            await createProjetoAPI(projeto);
        }
        handleClose();
        carregarProjetos();
    };

    const handleEditar = (proj) => {
        setProjeto(proj);
        setEditando(true);
        handleShow();
    };

    const handleExcluir = async (codigo) => {
        if (window.confirm('Deseja excluir este projeto?')) {
            await deleteProjetoAPI(codigo);
            carregarProjetos();
        }
    };

    return (
        <Container className="mt-4">
            <h2>Projetos</h2>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                <i className="bi bi-plus-circle"></i> Novo Projeto
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {projetos.map(proj => (
                        <tr key={proj.codigo}>
                            <td>{proj.codigo}</td>
                            <td>{proj.nome}</td>
                            <td>{proj.descricao}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEditar(proj)} className="me-2">
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleExcluir(proj.codigo)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editando ? 'Editar' : 'Novo'} Projeto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={projeto.nome}
                                onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={projeto.descricao}
                                onChange={(e) => setProjeto({ ...projeto, descricao: e.target.value })}
                            />
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
