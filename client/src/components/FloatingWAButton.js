import React from 'react';

const FloatingWAButton = () => {
  return (
    <a
      href="https://wa.me/6281372157714"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed sm:bottom-5 bottom-2 right-2 z-50"
    >
      <img
        src="/assets/img/home/wa-button.png" // Pastikan gambar ada di folder public
        alt="Hubungi Admin"
        className="sm:w-20 w-14 sm:h-20 rounded-full"
      />
    </a>
  );
};

export default FloatingWAButton;