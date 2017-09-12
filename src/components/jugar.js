import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { merge } from 'lodash';

import Fecha from './fecha';

class Jugar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      fechas: []
    };
  }

  componentDidMount() {
    this.props.getFechas();
    this.props.userInfo();
  }

  componentWillUpdate() {
    const systemFechas = this.props.fechas;
    const userFechas = this.props.user && this.props.user.fechas;

    // const newFechas = merge(userFechas, systemFechas);
    const newFechas = systemFechas.map(systemFecha => {
      systemFecha.games.forEach(game => {
        game.goalsHome = '';
        game.goalsAway = '';
      });
      const fechaInBoth = userFechas && userFechas.find(userFecha => userFecha.number === systemFecha.number);
      const gamesMissingInFechaInBoth = fechaInBoth && systemFecha.games.filter(systemGame =>
        !fechaInBoth.games.find(game => systemGame.number === game.number)
      );
      if(fechaInBoth) {
        fechaInBoth.games = fechaInBoth.games && fechaInBoth.games.concat(gamesMissingInFechaInBoth) || gamesMissingInFechaInBoth;
      }

      return fechaInBoth || systemFecha;
    });
    this.setState({fechas: newFechas});
  }

  handleChangeGoals(params) {
    const changingFecha = this.state.fechas.find(fecha => fecha.number === params.fechaNumber);
    const changingGame = changingFecha.games.find(game => game.number === params.juegoNumber);
    changingGame.goalsHome = params.goalsHome;
    changingGame.goalsAway = params.goalsAway;
    // const modified = [...changingFecha.games, ...changingGame];
    changingFecha.games = [...changingFecha.games, ...changingGame];
    const fechas = [...this.state.fechas, ...changingFecha];

    this.props.changePlayerGoals({fechas: fechas, username: this.props.user.username });
  }

  renderError() {
    if(this.state.error) {
      return <div className="alert alert-danger">{this.state.error}</div>;
    }
    return null;
  }

  render() {
    // const fechas = this.props.fechas.map(fecha => <Fecha key={fecha.number} fecha={fecha} changeGoals={this.handleChangeGoals.bind(this)} />);
    const fechas = this.state.fechas.map(fecha => <Fecha key={fecha.number} fecha={fecha} changeGoals={this.handleChangeGoals.bind(this)} />);

    return (
      <div>
        <h1>Jugar</h1>
        {fechas}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fechas: state.fechas,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(Jugar);
