import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm  } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({ email, password }) {
		console.log(email, password);
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h1>Entrar</h1>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Correo:</label>
						<Field name="email" component="input" type="text" className="form-control"/>
					</fieldset>
					<fieldset className="form-group">
						<label>Contraseña:</label>
						<Field name="password" component="input" type="password" className="form-control"/>
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Entrar</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
	form: 'signin',
	fields: ['email', 'password']
})(Signin);

export default connect(mapStateToProps, actions)(reduxFormSignin);
