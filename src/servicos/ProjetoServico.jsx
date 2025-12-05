import { getToken } from '../seguranca/Autenticacao';

const urlBase = process.env.REACT_APP_ENDERECO_API;

const getHeaders = () => {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getProjetosAPI = async () => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const getProjetoAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/projetos/${codigo}`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const createProjetoAPI = async (projeto) => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(projeto)
    });
    return await response.json();
};

export const updateProjetoAPI = async (projeto) => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(projeto)
    });
    return await response.json();
};

export const deleteProjetoAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/projetos/${codigo}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    return await response.json();
};
