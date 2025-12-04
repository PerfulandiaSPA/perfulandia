import api from './cliente';

export async function getAllPerfumes() {
    const response = await api.get(`api/v1/perfumes`);
    return response;
}

export async function getPerfumeById(id) {
    const response = await api.get(`api/v1/perfumes/${id}`);
    return response;
}

export async function createPerfume(perfume) {
    const response = await api.post(`api/v1/perfumes`, perfume);
    return response;
}

export async function deletePerfume(id) {
    const response = await api.delete(`api/v1/perfumes/${id}`);
    return response;
}

export async function updatePerfume(id, perfume) {
    const response = await api.put(`api/v1/perfumes/${id}`, perfume);
    return response;
}