import api from './cliente';

export async function getAllReviews() {
    const response = await api.get(`/reviews`);
    return response;
}

export async function getReviewById(id) {
    const response = await api.get(`/reviews/${id}`);
    return response;
}

export async function createReview(perfume) {
    const response = await api.get(`/reviews`, review);
    return response;
}

export async function deleteReview(id) {
    const response = await api.get(`/reviews/${id}`);
    return response;
}

export async function updateReview(id, perfume) {
    const response = await api.get(`/reviews/${id}`, review);
    return response;
}