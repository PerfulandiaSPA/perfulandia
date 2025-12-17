import { useEffect, useState } from "react";
import { Container, Card, Accordion, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getReviewsByPerfumeId, createReview } from '../../api/reviewService';
import { useAuth } from '../../context/AuthContext';

export default function PerfumeReviews({ perfumeId }) {
    const { username, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fetchReviews = () => {
        if (perfumeId) {
            getReviewsByPerfumeId(perfumeId)
                .then(data => setReviews(data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [perfumeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setErrorMsg("Debes iniciar sesión para comentar.");
            return;
        }

        setSubmitting(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const reviewData = {
                title: title,
                content: content,
                rating: rating,
                perfume: { idPerfume: Number(perfumeId) },

                user: { userName: username }
            };

            console.log("Enviando review:", reviewData);

            await createReview(reviewData);

            setSuccessMsg("¡Gracias! Tu reseña ha sido publicada.");
            setTitle("");
            setContent("");
            setRating(5);
            fetchReviews();
        } catch (error) {
            console.error("Error al enviar:", error);
            setErrorMsg("Ocurrió un error al guardar tu reseña.");
        } finally {
            setSubmitting(false);
        }
    };

    // Renderizar estrellas (Visualización)
    const renderStars = (stars) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < stars ? "#ffc107" : "#e4e5e9" }}>★</span>
        ));
    };

    // Renderizar estrellas (Input)
    const renderStarInput = () => {
        return (
            <div className="mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{
                            cursor: "pointer",
                            color: star <= rating ? "#ffc107" : "#e4e5e9",
                            fontSize: "1.5rem",
                            marginRight: "5px"
                        }}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (loading) return <p className="text-center mt-3">Cargando opiniones...</p>;

    return (
        <Container className="mt-4 mb-5">

            { }
            {isAuthenticated ? (

                <Card className="mb-4 shadow-sm border-0 bg-light">
                    <Card.Body>
                        <h5 className="mb-3">Hola, {username}. Escribe tu Reseña:</h5>

                        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                        {successMsg && <Alert variant="success">{successMsg}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Me encantó..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    maxLength={50}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Calificación</Form.Label>
                                <div>{renderStarInput()}</div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Tu Opinión</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" disabled={submitting}>
                                {submitting ? "Enviando..." : "Publicar Reseña"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            ) : (
                /* MOSTRAR LOGIN SI NO ESTÁ LOGUEADO */
                <Alert variant="warning" className="text-center py-4 mb-4 shadow-sm">
                    <h5 className="alert-heading fw-bold">¿Ya probaste este perfume?</h5>
                    <p className="mb-3">
                        Para dejar tu opinión, necesitas iniciar sesión.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="outline-dark" onClick={() => navigate("/login")}>
                            Iniciar Sesión
                        </Button>
                        <Button variant="link" onClick={() => navigate("/register")}>
                            Registrarse
                        </Button>
                    </div>
                </Alert>
            )}

            {/* LISTADO DE RESEÑAS */}
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Ver Opiniones ({reviews.length})
                    </Accordion.Header>
                    <Accordion.Body>
                        {reviews.length === 0 ? (
                            <p className="text-muted">No hay reseñas aún.</p>
                        ) : (
                            reviews.map((review) => (
                                <Card key={review.idReview || Math.random()} className="mb-3 border-0 border-bottom">
                                    <Card.Body className="p-2">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h6 className="fw-bold mb-0">{review.title}</h6>
                                                <small className="text-muted">
                                                    {/* Ojo aquí: verificamos si review.user existe */}
                                                    Por: {review.user?.userName || review.user?.username || "Usuario"}
                                                </small>
                                            </div>
                                            <div>
                                                {renderStars(review.rating || 5)}
                                            </div>
                                        </div>
                                        <Card.Text className="mt-2">
                                            {review.content}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}