import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './style.module.css';

function ImageGallery({ photos, modalOpen }) {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => {
        return (
          <ImageGalleryItem
            webformatURL={photo.webformatURL}
            key={photo.id}
            modalOpen={modalOpen}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
