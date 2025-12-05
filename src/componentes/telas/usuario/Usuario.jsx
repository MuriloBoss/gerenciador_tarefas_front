import { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { getUsuariosAPI, createUsuarioAdminAPI, deleteUsuarioAPI } from '../../../servicos/UsuarioServico';
import { isAdmin } from '../../../seguranca/Autenticacao';
import { Navigate } from 'react-router-dom';

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [show, setShow] = useState(false);
    const [usuario, setUsuario] = useState({ nome: '', email: '', senha: '', tipo: 'comum' });

    if (!isAdmin()) {
        return <Navigate to="/privado" />;
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const data = await getUsuariosAPI();
            setUsuarios(data.usuarios || []);
        } catch (err) {
            console.error('Erro ao carregar usuários:', err);
        }
    };

    const handleClose = () => {
        setShow(false);
        setUsuario({ nome: '', email: '', senha: '', tipo: 'comum' });
    };

    const handleShow = () => setShow(true);

    const handleSalvar = async () => {
        await createUsuarioAdminAPI(usuario);
        handleClose();
        carregarUsuarios();
    };

    const handleExcluir = async (codigo) => {
        if (window.confirm('Deseja excluir este usuário?')) {
            await deleteUsuarioAPI(codigo);
            carregarUsuarios();
        }
    };

    return (
        <Container className="mt-4">
            <h2>Gerenciar Usuários</h2>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                <i className="bi bi-plus-circle"></i> Novo Usuário
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user.codigo}>
                            <td>{user.codigo}</td>
                            <td>{user.nome}</td>
                            <td>{user.email}</td>
                            <td>
                                <Badge bg={user.tipo === 'admin' ? 'danger' : 'secondary'}>
                                    {user.tipo}
                                </Badge>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleExcluir(user.codigo)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={usuario.nome}
                                onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={usuario.email}
                                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={usuario.senha}
                                onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select
                                value={usuario.tipo}
                                onChange={(e) => setUsuario({ ...usuario, tipo: e.target.value })}
                            >
                                <option value="comum">Comum</option>
                                <option value="admin">Admin</option>
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
