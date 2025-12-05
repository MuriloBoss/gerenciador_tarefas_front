import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsuarioAPI } from '../../../servicos/UsuarioServico';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const acaoCadastrar = async e => {
        e.preventDefault();
        try {
            const body = { nome, email, senha, tipo: 'comum' };
            setCarregando(true);
            const result = await createUsuarioAPI(body);
            if (result.status === 'success') {
                setAlerta({ status: "success", message: "Usuário cadastrado com sucesso! Faça login." });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setAlerta({ status: "error", message: result.message || "Erro ao cadastrar" });
            }
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoCadastrar}>
                            <h1 className="h3 mb-3 fw-normal">Cadastro de Usuário</h1>
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
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={e => setSenha(e.target.value)}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={100} />
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Cadastrar</button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
