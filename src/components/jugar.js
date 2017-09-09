import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Fecha from './fecha';

class Jugar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  componentDidMount() {
    this.props.getFechas();
  }

  handleChangeGoals(params) {
    this.props.changeGoals(params);
  }

  renderError() {
    if(this.state.error) {
      return <div className="alert alert-danger">{this.state.error}</div>;
    }
    return null;
  }

  render() {
    const fechas = this.props.fechas.map(fecha => <Fecha key={fecha.number} fecha={fecha} changeGoals={this.handleChangeGoals.bind(this)} />);

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
    fechas: state.fechas
  }
}

export default connect(mapStateToProps, actions)(Jugar);
