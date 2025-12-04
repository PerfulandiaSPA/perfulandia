import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import IndividualIntervalsExample from '../components/home/Carousel';

function Home() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      {isAdmin && (
        <div className="mb-4 mt-3">
          <Button 
            variant="warning" 
            onClick={() => navigate('/admin/perfumes')}
          >
            Gestionar Perfumes
          </Button>
        </div>
      )}
      {/* Aquí se inserta el carrusel dentro del container */}
      <IndividualIntervalsExample />
    </Container>
  );
}

export default Home;