import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ResultadosComponent = (props) => {
  const userResults = (props.users.length && props.users.map(user => <div><span>{user.username}</span><span>{user.points || 0}</span></div>));
  return (
    <div>
      {userResults}
    </div>
  );
}

class Resultados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getFechas();
    //const fechas = [{"_id":"59ade758b6e2a4bdc18dec04","number":1,"closingDate":"2017-01-01T00:00:00.000Z","__v":6,"games":[{"goalsAway":"1","goalsHome":"6","number":1,"awayTeam":"Municipal Grecia","homeTeam":"Deportivo Saprissa"}]},{"_id":"59af373ffa27d9ff989c2329","number":2,"closingDate":"2017-09-05T00:00:00.000Z","__v":3,"games":[{"goalsAway":"1","goalsHome":"1","number":1,"awayTeam":"Brasil","homeTeam":"Colombia"},{"goalsAway":"1","goalsHome":"1","number":2,"awayTeam":"USA","homeTeam":"Honduras"},{"goalsAway":"1","goalsHome":"1","number":3,"awayTeam":"Mexico","homeTeam":"Costa Rica"}]},{"_id":"59b21da2e5625185bc98e410","number":3,"closingDate":"2017-09-30T19:59:00.000Z","__v":10,"games":[{"goalsAway":"0","goalsHome":"3","number":1,"awayTeam":"Anderlecht","homeTeam":"Bayern"},{"goalsAway":"0","goalsHome":"3","number":2,"awayTeam":"FC Basel","homeTeam":"Mancheser United"},{"goalsAway":"5","goalsHome":"0","number":3,"awayTeam":"Paris Saint Germain","homeTeam":"Celtic"},{"goalsAway":"0","goalsHome":"0","number":4,"awayTeam":"Atletico de Madrid","homeTeam":"Roma"},{"goalsAway":"0","goalsHome":"3","number":5,"awayTeam":"Juventus","homeTeam":"Barcelona"},{"number":6,"awayTeam":"Sevilla","homeTeam":"Liverpool"},{"number":7,"awayTeam":"Apoel FC","homeTeam":"Real Madrid"},{"number":8,"awayTeam":"Borussia Dortmund","homeTeam":"Tottenham"}]}];
  }

  componentWillReceiveProps(nextProps) {
    this.props.getPlayersWithPoints(nextProps.fechas);
  }

  renderCols(games) {
    return games.map(game => <td>{game.goalsHome}</td>);
  }

  renderRows(fecha, user) {
    return user.fechas.map(currentFecha => {
      if(currentFecha.number === fecha.number) {
        return <tr><td>{user.username}</td>{this.renderCols(currentFecha.games)}</tr>
      }
    });
  }

  renderResultados() {
    
    return this.state.users.length && this.state.users.map(user => <div><span>{user.username}</span><span>{user.points || 0}</span></div>);
    /* return this.props.fechas.map(fecha => {
      return (
        <table className="table">
          <thead>
            <tr>
              {fecha.games.map(game => <th>{game.homeTeam}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => 
              this.renderRows(fecha, user)
            )}
          </tbody>
        </table>
      );
    }); */
  }

  render() {
    return (
      <div>
        <h1>Resultados</h1>
        <ResultadosComponent users={this.props.users} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fechas: state.fechas,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(Resultados);
