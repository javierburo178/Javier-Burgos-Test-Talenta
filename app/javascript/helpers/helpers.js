import { error } from './notifications';

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateFilm = (film) => {
  const errors = {};

  if (film.name === '') {
    errors.name = 'You must enter a name';
  }

  if (!isValidDate(film.film_date)) {
    errors.film_date = 'You must enter a valid date';
  }

  if (film.description === '') {
    errors.description = 'You must enter a description';
  }

  if (film.url_image === '') {
    errors.url_image = 'You must enter a image_url';
  }


  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};
