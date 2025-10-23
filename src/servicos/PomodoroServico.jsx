const urlBase = process.env.REACT_APP_ENDERECO_API;

export const getPomodorosAPI = async () => {
    const response = await fetch(`${urlBase}/pomodoros`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getPomodorosTarefaAPI = async (tarefa_codigo) => {
    const response = await fetch(`${urlBase}/tarefas/${tarefa_codigo}/pomodoros`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const createPomodoroAPI = async (pomodoro) => {
    const response = await fetch(`${urlBase}/pomodoros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pomodoro)
    });
    return await response.json();
};

export const updatePomodoroAPI = async (codigo, data) => {
    const response = await fetch(`${urlBase}/pomodoros/${codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
};
