import React from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Profile.css'; // Crearemos este archivo abajo

// --- ICONOS SVG ELEGANTES ---
const IconLogout = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ProfileScreen = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Obtener inicial para el avatar
  const initial = username ? username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-bg d-flex align-items-center justify-content-center min-vh-100 py-5">
      <Container style={{ maxWidth: '800px' }}>
        <Card className="profile-card shadow-lg border-0 overflow-hidden">
          {/* Cabecera Decorativa */}
          <div className="profile-header-bg"></div>

          <Card.Body className="text-center px-5 pb-5 pt-0 relative-z">
            {/* Avatar */}
            <div className="avatar-container mx-auto mb-4">
              <span className="avatar-text">{initial}</span>
            </div>

            {/* Info Usuario */}
            <h2 className="profile-name mb-1">Hola, {username}</h2>
            <p className="text-muted mb-3 letter-spacing-1"></p>
            <Badge bg="dark" className="px-3 py-2 fw-light mb-4 text-uppercase tracking-wider">
              Cuenta Verificada
            </Badge>

            <hr className="divider-light my-4" />

            {/* Panel de Estadísticas (Ficticio para estética) */}
            <Row className="mb-5 g-4 justify-content-center">
              <Col xs={6} md={4}>
                <div className="stat-box p-3 rounded">
                  <h3 className="fw-bold mb-0">0</h3>
                  <small className="text-muted text-uppercase">Pedidos</small>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="stat-box p-3 rounded">
                  <h3 className="fw-bold mb-0">0</h3>
                  <small className="text-muted text-uppercase">Favoritos</small>
                </div>
              </Col>
            </Row>

            {/* Botones de Acción */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">

              <Button
                variant="dark"
                onClick={handleLogout}
                className="btn-profile-logout d-flex align-items-center justify-content-center gap-2"
              >
                <span>Cerrar Sesión</span>
                <IconLogout />
              </Button>
            </div>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProfileScreen;