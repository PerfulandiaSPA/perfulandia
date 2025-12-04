import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import IndividualIntervalsExample from '../components/home/Carousel';

function Home() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <IndividualIntervalsExample />
    </Container>
  );
}

export default Home;