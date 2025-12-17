import api from './cliente';

export async function login(userName, password) {
    const response = await api.post('/api/auth/login', { userName, password });
    return response;

}

export async function register(userName, email, password) {
    console.log("Enviando registro:", { userName, email, password });

    // Enviamos el objeto con las 3 propiedades
    const response = await api.post('api/auth/register', {
        userName,
        email,
        password
    });
    return response.data;
}