import api from './cliente';

export async function getAllReviews() {
    return await api.get(`api/v1/reviews`);
}


export async function getReviewById(id) {
    return await api.get(`api/v1/reviews/${id}`);
}

export async function getReviewsByPerfumeId(perfumeId) {
    try {

        const allReviews = await api.get('api/v1/reviews');

        console.log("Reviews recibidas del backend:", allReviews); // Para depurar

        // Ahora sí podemos filtrar porque allReviews es un Array
        if (Array.isArray(allReviews)) {
            return allReviews.filter(r =>
                r.perfume && r.perfume.idPerfume === Number(perfumeId)
            );
        } else {
            console.error("La respuesta no es un array:", allReviews);
            return [];
        }

    } catch (error) {
        console.error("Error filtrando reviews:", error);
        return [];
    }
}

export async function createReview(reviewData) {
    return await api.post(`api/v1/reviews`, reviewData);
}

export async function deleteReview(id) {
    return await api.delete(`api/v1/reviews/${id}`);
}

export async function updateReview(id, reviewData) {
    return await api.put(`api/v1/reviews/${id}`, reviewData);
}