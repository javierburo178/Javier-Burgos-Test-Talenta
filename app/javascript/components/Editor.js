/* global window */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Film from './Film';
import FilmForm from './FilmForm';
import FilmList from './FilmList';
import Header from './Header';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      films: null,
    };

    this.addFilm = this.addFilm.bind(this);
    this.deleteFilm = this.deleteFilm.bind(this);
    this.updateFilm = this.updateFilm.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/films.json')
      .then(response => this.setState({ films: response.data }))
      .catch(handleAjaxError);
  }

  addFilm(newFilm) {
    axios
      .post('/api/films.json', newFilm)
      .then((response) => {
        success('Film Added!');
        const savedFilm = response.data;
        this.setState(prevState => ({
          films: [...prevState.films, savedFilm],
        }));
        const { history } = this.props;
        history.push(`/films/${savedFilm.id}`);
      })
      .catch(handleAjaxError);
  }

  deleteFilm(filmId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/films/${filmId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Film deleted successfully');
            const { history } = this.props;
            history.push('/films');

            const { films } = this.state;
            this.setState({ films: films.filter(film => film.id !== filmId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  updateFilm(updatedFilm) {
    axios
      .put(`/api/films/${updatedFilm.id}.json`, updatedFilm)
      .then(() => {
        success('Film updated');
        const { films } = this.state;
        const idx = films.findIndex(film => film.id === updatedFilm.id);
        films[idx] = updatedFilm;
        const { history } = this.props;
        history.push(`/films/${updatedFilm.id}`);
        this.setState({ films });
      })
      .catch(handleAjaxError);
  }

  render() {
    const { films } = this.state;
    if (films === null) return null;

    const { match } = this.props;
    const filmId = match.params.id;
    const film = films.find(e => e.id === Number(filmId));

    return (
      <div>
        <Header />
        <div className="grid">
          <FilmList films={films} activeId={Number(filmId)} />
          <Switch>
            <PropsRoute path="/films/new" component={FilmForm} onSubmit={this.addFilm} />
            <PropsRoute
              exact
              path="/films/:id/edit"
              component={FilmForm}
              film={film}
              onSubmit={this.updateFilm}
            />
            <PropsRoute
              path="/films/:id"
              component={Film}
              film={film}
              onDelete={this.deleteFilm}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;