import React from 'react';
import css from './style.module.css';
function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.name.value);
    // e.currentTarget.elements.name.value = '';
  };
  return (
    <header>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <div className={css.Input_container}>
          <button
            type="submit"
            className={css.SearchForm_button}
            onSubmit={handleSubmit}
          ></button>
          <input
            name="name"
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
}

export default Searchbar;
