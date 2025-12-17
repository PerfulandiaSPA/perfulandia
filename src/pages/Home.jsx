import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import IndividualIntervalsExample from '../components/home/Carousel';
import DealsSection from '../components/home/DealsSection';

function Home() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <IndividualIntervalsExample />
      <DealsSection />
    </Container>
  );
}

export default Home;