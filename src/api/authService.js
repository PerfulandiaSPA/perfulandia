import api from './cliente';

export async function login(userName, password) {
    const response = await api.post('/api/auth/login', { userName, password });
    return response;
}
