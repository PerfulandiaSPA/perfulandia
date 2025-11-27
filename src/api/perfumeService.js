import api from './cliente';

export async function getAllPerfumes() {
    const response = await api.get(`/perfumes`);
    return response;
}

export async function getPerfumeById(id) {
    const response = await api.get(`/perfumes/${id}`);
    return response;
}

export async function createPerfume(perfume) {
    const response = await api.get(`/perfumes`, perfume);
    return response;
}

export async function deletePerfume(id) {
    const response = await api.get(`/perfumes/${id}`);
    return response;
}

export async function updatePerfume(id, perfume) {
    const response = await api.get(`/perfumes/${id}`, perfume);
    return response;
}