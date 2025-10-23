const urlBase = process.env.REACT_APP_ENDERECO_API;

export const getProjetosAPI = async () => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const getProjetoAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/projetos/${codigo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};

export const createProjetoAPI = async (projeto) => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projeto)
    });
    return await response.json();
};

export const updateProjetoAPI = async (projeto) => {
    const response = await fetch(`${urlBase}/projetos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projeto)
    });
    return await response.json();
};

export const deleteProjetoAPI = async (codigo) => {
    const response = await fetch(`${urlBase}/projetos/${codigo}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
};
