import React from 'react';
import css from './style.module.css';
function Button({ loadingMore }) {
  return (
    <button className={css.Button} type="button" onClick={loadingMore}>
      Load more
    </button>
  );
}

export default Button;
