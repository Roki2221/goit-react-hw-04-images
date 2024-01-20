import css from './style.module.css';
import React, { useEffect } from 'react';

function Modal(props) {
  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleClick = e => {
    e.target === e.currentTarget && props.close();
  };
  const handleEsc = e => {
    e.code === 'Escape' && props.close();
    console.log('first');
  };
  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={props.openedImage} alt="" />
      </div>
    </div>
  );
}

export default Modal;
