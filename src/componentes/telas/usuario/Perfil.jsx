import { useState, useEffect } from 'react';
import { getUsuarioAPI, updateUsuarioAPI } from '../../../servicos/UsuarioServico';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';

function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        carregarPerfil();
    }, []);

    const carregarPerfil = async () => {
        try {
            setCarregando(true);
            const data = await getUsuarioAPI();
            if (data.status === 'success') {
                setNome(data.usuario.nome);
                setEmail(data.usuario.email);
                setTipo(data.usuario.tipo);
            } else {
                setAlerta({ status: "error", message: data.message || "Erro ao carregar perfil" });
            }
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    const acaoAtualizar = async e => {
        e.preventDefault();
        try {
            const body = { nome, email };
            if (senha) body.senha = senha;
            setCarregando(true);
            const result = await updateUsuarioAPI(body);
            if (result.status === 'success') {
                setAlerta({ status: "success", message: "Perfil atualizado com sucesso!" });
                setSenha("");
            } else {
                setAlerta({ status: "error", message: result.message || "Erro ao atualizar" });
            }
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoAtualizar}>
                            <h1 className="h3 mb-3 fw-normal">Meu Perfil</h1>
                            <CampoEntrada value={nome}
                                id="txtNome" name="nome" label="Nome"
                                tipo="text" onchange={e => setNome(e.target.value)}
                                msgvalido="Nome OK" msginvalido="Informe o nome"
                                requerido={true} readonly={false}
                                maxCaracteres={100} />
                            <CampoEntrada value={email}
                                id="txtEmail" name="email" label="Email"
                                tipo="email" onchange={e => setEmail(e.target.value)}
                                msgvalido="Email OK" msginvalido="Informe o email"
                                requerido={true} readonly={false}
                                maxCaracteres={100} />
                            <CampoEntrada value={senha}
                                id="txtSenha" name="senha" label="Nova Senha (deixe em branco para não alterar)"
                                tipo="password" onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK" msginvalido=""
                                requerido={false} readonly={false}
                                maxCaracteres={100} />
                            <div className="mb-3">
                                <label className="form-label">Tipo de Usuário</label>
                                <input type="text" className="form-control" value={tipo} readOnly />
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Atualizar</button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
