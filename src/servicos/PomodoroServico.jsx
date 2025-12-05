import { getToken } from '../seguranca/Autenticacao';

const urlBase = process.env.REACT_APP_ENDERECO_API;

const getHeaders = () => {
    const token = getToken();
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getPomodorosAPI = async () => {
    const response = await fetch(`${urlBase}/pomodoros`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const getPomodorosTarefaAPI = async (tarefa_codigo) => {
    const response = await fetch(`${urlBase}/tarefas/${tarefa_codigo}/pomodoros`, {
        method: "GET",
        headers: getHeaders()
    });
    return await response.json();
};

export const createPomodoroAPI = async (pomodoro) => {
    const response = await fetch(`${urlBase}/pomodoros`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(pomodoro)
    });
    return await response.json();
};

export const updatePomodoroAPI = async (codigo, data) => {
    const response = await fetch(`${urlBase}/pomodoros/${codigo}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};
