import { Container } from 'react-bootstrap';
import IndividualIntervalsExample from '../components/home/Carousel';

function Home() {
  return (
    <Container>
      <h1></h1>
      {/* Aquí se inserta el carrusel dentro del container */}
      <IndividualIntervalsExample />
    </Container>
  );
}

export default Home;