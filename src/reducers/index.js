import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import fechas from './fechas';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	fechas: fechas
});

export default rootReducer;
