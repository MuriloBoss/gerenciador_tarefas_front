const urlBase = process.env.REACT_APP_ENDERECO_API;

export const getTarefasAPI = async () => {
    const response = await fetch(`${urlBase}/tarefas`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getTarefaAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/tarefas/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getTarefasProjetoAPI = async (projeto_codigo) => {
    const response = await fetch(`${urlBase}/projetos/${projeto_codigo}/tarefas`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const createTarefaAPI = async (tarefa) => {
    const response = await fetch(`${urlBase}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefa)
    });
    return await response.json();
};

export const updateTarefaAPI = async (tarefa) => {
    const response = await fetch(`${urlBase}/tarefas`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefa)
    });
    return await response.json();
};

export const deleteTarefaAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/tarefas/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};
