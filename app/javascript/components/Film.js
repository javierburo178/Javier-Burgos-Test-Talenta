import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FilmNotFound from './FilmNotFound';

const Film = ({ film, onDelete }) => {
  if (!film) return <FilmNotFound />;

  return (
    <div className="filmContainer">
      <h2>
        {film.film_date}
        {' - '}
        {film.name}
        {' '}
        <Link to={`/films/${film.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(film.id)}>
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Name:</strong>
          {' '}
          {film.name}
        </li>
        <li>
          <strong>Date:</strong>
          {' '}
          {film.film_date}
        </li>
        <li>
          <strong>Description:</strong>
          {' '}
          {film.description}
        </li>
        <li>
          <strong>Image:</strong>
          {' '}
          {film.url_image}
        </li>
      </ul>
    </div>
  );
};

Film.propTypes = {
  film: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Film.defaultProps = {
  film: undefined,
};

export default Film;