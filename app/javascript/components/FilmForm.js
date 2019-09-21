import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { Link } from 'react-router-dom';
import { formatDate, isEmptyObject, validateFilm } from '../helpers/helpers';
import FilmNotFound from './FilmNotFound';
import 'pikaday/css/pikaday.css';

class FilmForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      film: props.film,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    /* eslint-disable no-new */
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateFilm('film_date', formattedDate);
      },
    });
  }

  componentWillReceiveProps({ film }) {
    this.setState({ film });
  }

  updateFilm(key, value) {
    this.setState(prevState => ({
      film: {
        ...prevState.film,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { film } = this.state;
    const errors = validateFilm(film);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(film);
    }
  }

  handleInputChange(film) {
    const { target } = film;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateFilm(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the film from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { film } = this.state;
    const { path } = this.props;

    if (!film.id && path === '/films/:id/edit') return <FilmNotFound />;

    const cancelURL = film.id ? `/films/${film.id}` : '/films';
    const name = film.id ? `${film.film_date} - ${film.name}` : 'New Film';

    return (
      <div>
        <h2>{name}</h2>

        {this.renderErrors()}

        <form className="filmForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="film_type">
              <strong>Name:</strong>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.handleInputChange}
                value={film.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="film_date">
              <strong>Date:</strong>
              <input
                type="text"
                id="film_date"
                name="film_date"
                ref={this.dateInput}
                autoComplete="off"
                value={film.film_date}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <strong>Description:</strong>
              <input
                type="text"
                id="description"
                name="description"
                onChange={this.handleInputChange}
                value={film.description}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <strong>Url_image:</strong>
              <input
                type="text"
                id="url_image"
                name="url_image"
                onChange={this.handleInputChange}
                value={film.url_image}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

FilmForm.propTypes = {
  film: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

FilmForm.defaultProps = {
  film: {
    name: '',
    film_date: '',
    description: '',
    url_image: '',
  },
};

export default FilmForm;