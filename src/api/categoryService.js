import api from './cliente';

export async function getAllCategories() {
    try {
        const result = await api.get(`/api/v1/categories`);
        return Array.isArray(result) ? result : (result.data || []);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getCategoryById(id) {
    return api.get(`/api/v1/categories/${id}`);
}

export async function createCategory(category) {
    return api.post(`/api/v1/categories`, category);
}

export async function deleteCategory(id) {
    return api.delete(`/api/v1/categories/${id}`);
}

export async function updateCategory(id, category) {
    return api.put(`/api/v1/categories/${id}`, category);
}