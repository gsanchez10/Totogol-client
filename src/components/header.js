import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router';
import * as actions from '../actions';


class Header extends Component {
	signoutUser() {
		this.props.signoutUser();
	}

	renderLinks() {
		if(this.props.isAuthenticated) {
			return (
				<ul className="nav navbar-nav toto-nav">
					<li className="nav-item">
						<Link to="/editor" className={classnames({ 'nav-active': location.pathname === '/editor' })}>Editor</Link>
					</li>
					<li className="nav-item">
						<Link to="/jugar" className={classnames({ 'nav-active': location.pathname === '/jugar' })}>Jugar</Link>
					</li>
					<li className="nav-item">
						<Link to="/cuenta" className={classnames({ 'nav-active': location.pathname === '/cuenta' })}>Cuenta</Link>
					</li>
					<li className="nav-item">
						<Link to="/resultados" className={classnames({ 'nav-active': location.pathname === '/resultados' })}>Resultados</Link>
					</li>
					<li className="nav-item">
						<button onClick={this.signoutUser.bind(this)}>Salir</button>
					</li>
				</ul>
			);
		}

		return (
			<ul className="nav navbar-nav toto-nav">
				<li className="nav-item">
					<Link to="/registrarse" className={classnames({ 'nav-active': location.pathname === '/registrarse' })}>Registrarse</Link>
				</li>
				<li className="nav-item">
					<Link to="/entrar" className={classnames({ 'nav-active': location.pathname === '/entrar' })}>Entrar</Link>
				</li>
			</ul>
		);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-default" >
					<nav className="navbar navbar-inverse">
				    <div className="navbar-header">
							<a className="navbar-brand" href="#">TOTOGOL</a>
						</div>
					</nav>
					{this.renderLinks()}
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { isAuthenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
