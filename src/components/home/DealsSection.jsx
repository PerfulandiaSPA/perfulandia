import React, { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import PerfumeCard from '../perfumes/PerfumeCard';
import { useCart } from '../../context/CartContext';
import { getAllPerfumes } from '../../api/perfumeService';
import './DealsSection.css';

const DealsSection = () => {
  const { addToCart } = useCart();
  const [dealPerfumes, setDealPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealPerfumes = async () => {
      try {
        setLoading(true);
        const allPerfumes = await getAllPerfumes();
        // Filtramos solo los perfumes que están marcados como en oferta (isActive: true)
        const onSalePerfumes = Array.isArray(allPerfumes) 
          ? allPerfumes.filter(p => p.isActive === true) 
          : [];
        setDealPerfumes(onSalePerfumes);
      } catch (err) {
        console.error("Error al obtener las ofertas:", err);
        setError("No se pudieron cargar las ofertas en este momento.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealPerfumes();
  }, []);

  const handleAddToCart = (perfume) => {
    addToCart(perfume);
    alert(`${perfume.productName || perfume.name} ha sido agregado al carrito.`);
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center"><Spinner animation="border" /></div>;
    }

    if (error) {
      return <Alert variant="warning">{error}</Alert>;
    }

    if (dealPerfumes.length === 0) {
      return <Alert variant="info">No hay ofertas especiales disponibles hoy.</Alert>;
    }

    return (
      <div className="deals-grid-container">
        {dealPerfumes.map(perfume => (
          <PerfumeCard
            key={perfume.idPerfume || perfume.id}
            product={perfume}
            onAdd={() => handleAddToCart(perfume)}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="deals-section">
      <h2 className="deals-section-title">Ofertas que Enamoran</h2>
      {renderContent()}
    </section>
  );
};

export default DealsSection;
