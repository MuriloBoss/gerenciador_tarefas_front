import { getToken } from '../seguranca/Autenticacao';

const urlBase = process.env.REACT_APP_ENDERECO_API;

const getHeaders = () => {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const createUsuarioAPI = async (usuario) => {
    const response = await fetch(`${urlBase}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });
    return await response.json();
};

export const getUsuarioAPI = async () => {
    const response = await fetch(`${urlBase}/usuarios/perfil`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const updateUsuarioAPI = async (usuario) => {
    const response = await fetch(`${urlBase}/usuarios/perfil`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(usuario)
    });
    return await response.json();
};

export const getUsuariosAPI = async () => {
    const response = await fetch(`${urlBase}/usuarios`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const createUsuarioAdminAPI = async (usuario) => {
    const response = await fetch(`${urlBase}/usuarios/admin`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(usuario)
    });
    return await response.json();
};

export const deleteUsuarioAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/usuarios/${codigo}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};
