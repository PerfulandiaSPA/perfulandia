import api from './cliente';

export async function getAllCategories() {
    const response = await api.get(`/category`);
    return response;
}

export async function getCategoryById(id) {
    const response = await api.get(`/category/${id}`);
    return response;
}

export async function createCategory(perfume) {
    const response = await api.post(`/category`, category);
    return response;
}

export async function deleteCategory(id) {
    const response = await api.delete(`/category/${id}`);
    return response;
}

export async function updateCategory(id, libro) {
    const response = await api.put(`/category/${id}`, category);
    return response;
}