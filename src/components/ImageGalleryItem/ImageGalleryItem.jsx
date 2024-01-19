import React from 'react';
import css from './style.module.css';

function ImageGalleryItem({ webformatURL, modalOpen }) {
  const handleClick = e => {
    modalOpen(e.target.src);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img src={webformatURL} alt="" onClick={handleClick} />
    </li>
  );
}

export default ImageGalleryItem;
