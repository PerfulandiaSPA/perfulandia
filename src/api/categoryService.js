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
    const response = await api.get(`/category`, category);
    return response;
}

export async function deleteCategory(id) {
    const response = await api.get(`/category/${id}`);
    return response;
}

export async function updateCategory(id, libro) {
    const response = await api.get(`/category/${id}`, category);
    return response;
}