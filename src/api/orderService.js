import api from './cliente';

export async function getAllOrders() {
    const response = await api.get(`/order`);
    return response;
}

export async function getOrderById(id) {
    const response = await api.get(`/order/${id}`);
    return response;
}

export async function createOrder(perfume) {
    const response = await api.post(`/order`, order);
    return response;
}

export async function deleteOrder(id) {
    const response = await api.delete(`/order/${id}`);
    return response;
}

export async function updateOrder(id, perfume) {
    const response = await api.put(`/order/${id}`, order);
    return response;
}