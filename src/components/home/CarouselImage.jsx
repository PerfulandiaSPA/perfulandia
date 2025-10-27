function CarouselImage({ text }) {
  let imgSrc = '/resources/images/carousel_1.png';
  if (text === 'Second slide') imgSrc = '/resources/images/carousel_2.png';
  else if (text === 'Third slide') imgSrc = '/resources/images/carousel_3.png';

  return (
    <img
      className="carousel-img"                 // <-- clase nueva
      src={imgSrc}
      alt={text}
      loading="eager"
      decoding="async"
    />
  );
}

export default CarouselImage;
