import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, GET_PACKS, UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/feature'
				browserHistory.push('/editor');
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('Correo o contraseña incorrecto.'));
			})
	}
}

export function userInfo() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/userInfo`, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('Correo o contraseña incorrecto.'));
			})
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	browserHistory.push('/entrar');

	return {
		type: UNAUTH_USER
	}
}

export function signupUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, password })
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/feature'
				browserHistory.push('/editor');
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('No se pudo registrar.'));
			})
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function getCompetitions() {
	return function(dispatch) {
		axios.get('http://api.football-data.org/v1/competitions/?season=2017', { headers: { 'X-Auth-Token': '56c224c9f1ec483095b2c742a01336c2' }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: 'GET_COMPETITIONS', payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function getFechas() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fechas`, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'GET_FECHAS', payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function addFecha(fecha) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addFecha`, fecha, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'ADD_FECHA', payload: fecha });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function addGame(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addGame`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'ADD_JUEGO', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function changeGoals(params) {
	return function(dispatch) {
		axios.put(`${ROOT_URL}/changeGoals`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'CHANGE_GOALS', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function deleteGame(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/deleteGame`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'DELETE_GAME', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function deleteFecha(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/deleteFecha`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'DELETE_FECHA', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function changePlayerGoals(fechas) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/changePlayerGoals`, fechas, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'PLAYER_GOALS_CHANGE', payload: response });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}
