import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Resultados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getFechas();
    this.props.getPlayers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({users: nextProps.users});
    
    if(nextProps.users.length && nextProps.fechas) {
      const users = nextProps.users.map(user => {
        console.log('user:', user.username);
        user.points = 0;
        const fechas = user.fechas.map(fecha => {
          fecha.points = 0;
          console.log('fecha number:', fecha.number);
          const systemFecha = this.props.fechas.find(propsFecha => propsFecha.number === fecha.number);
          const games = fecha.games.map(game => {
            const systemGame = systemFecha.games.find(propsGame => propsGame.number === game.number);
            const systemGoalsHome = parseInt(systemGame.goalsHome);
            const systemGoalsAway = parseInt(systemGame.goalsAway);
            /*console.log('game number:', game.number);
            console.log('system game goals home:', systemGoalsHome);
            console.log('user game goals home:', game.goalsHome);
            console.log('system game goals away:', systemGoalsAway);
            console.log('user game goals away:', game.goalsAway);*/
            const systemResult = systemGoalsHome >= systemGoalsAway ? (systemGoalsHome === systemGoalsAway ? 'tie':'home'):'away';

            const gameResult = game.goalsHome === '' && game.goalsAway === '' ? '' : (game.goalsHome >= game.goalsAway ? (game.goalsHome === game.goalsAway ? 'tie':'home'):'away');

            if(systemResult === gameResult) {
              user.points += 1;
              fecha.points += 1;
              if(game.goalsHome !== '' && game.goalsAway !== '' && systemGoalsHome === game.goalsHome && systemGoalsAway === game.goalsAway) {
                user.points += 2;
                fecha.points += 2;
              }
            }
            console.log('fecha points:', fecha.points);
            console.log('points:', user.points);
            console.log('--------------------------------------------------------------');
          });
        });
        return user;
      });
      this.setState({users:users});
    }
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
        {this.renderResultados()}
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
