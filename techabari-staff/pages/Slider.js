import { useState, useEffect } from 'react';
import Image from 'next/image'
const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className='slider-container'>
   <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>
      {images.map((image, i) => (
        <Image
          key={i}
          src={image}
          alt={`Slide ${i + 1}`}
          className={i === index ? 'active' : 'hidden'}
        />
      ))}
    </div>
    </div>
  );
};

export default Slider;
