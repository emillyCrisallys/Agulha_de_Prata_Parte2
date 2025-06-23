// src/components/Carousel.tsx
import React from 'react';
import Slider from 'react-slick';

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <h3>Imagem 1</h3>
        <img src="/src/img/1.jpg" alt="Imagem 1" style={{ width: '100%' }} />
      </div>
      <div>
        <h3>Imagem 2</h3>
        <img src="/src/img/2.jpg" alt="Imagem 2" style={{ width: '100%' }} />
      </div>
      <div>
        <h3>Imagem 3</h3>
        <img src="/src/img/3.jpg" alt="Imagem 3" style={{ width: '100%' }} />
      </div>
    </Slider>
  );
};

export default Carousel;