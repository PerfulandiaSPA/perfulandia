import api from './cliente';

// 1. OBTENER TODOS LOS USUARIOS (GET /users)
export async function getAllUsers() {
    // CORRECCIÓN: Usar ruta relativa.
    const response = await api.get(`/users`);
    return response;
}

// 2. OBTENER USUARIO POR ID (GET /users/{id})
export async function getUserById(id) {
    // CORRECCIÓN: Usar ruta relativa.
    const response = await api.get(`/users/${id}`);
    return response;
}

// 3. CREAR USUARIO (POST /users)
// El parámetro fue renombrado de 'perfume' a 'user' para mayor claridad.
export async function createUser(user) {
    // CORRECCIÓN: Usar ruta relativa.
    const response = await api.post(`/users`, user);
    return response;
}

// 4. ELIMINAR USUARIO (DELETE /users/{id})
// La función fue renombrada y se corrigió la sintaxis.
export async function deleteUser(id) {
    // CORRECCIÓN: Se corrigió la sintaxis de la función y se usa ruta relativa.
    const response = await api.delete(`/users/${id}`);
    return response;
}

// 5. ACTUALIZAR USUARIO (PUT /users/{id})
// La función fue renombrada y el parámetro del cuerpo fue corregido.
export async function updateUser(id, user) {
    // CORRECCIÓN: Se renombró la función y se usa el cuerpo 'user'.
    const response = await api.put(`/users/${id}`, user);
    return response;
}