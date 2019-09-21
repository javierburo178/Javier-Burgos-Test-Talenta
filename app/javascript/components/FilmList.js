/* eslint-disable camelcase */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, published, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;

    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderFilms() {
    const { activeId, films } = this.props;
    const filteredFilms = films
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.film_date) - new Date(a.film_date));

    return filteredFilms.map(film => (
      <li key={film.id}>
        <Link to={`/films/${film.id}`} className={activeId === film.id ? 'active' : ''}>
          {film.film_date}
          {' - '}
          {film.name}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="filmList">
        <h2>
          Films
          <Link to="/films/new">New Film</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />

        <ul>{this.renderFilms()}</ul>
      </section>
    );
  }
}

FilmList.propTypes = {
  activeId: PropTypes.number,
  films: PropTypes.arrayOf(PropTypes.object),
};

FilmList.defaultProps = {
  activeId: undefined,
  films: [],
};

export default FilmList;