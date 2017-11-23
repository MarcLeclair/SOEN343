import { combineReducers } from 'redux';

import authentication from './authentication';
import product from './product';
import snackbar from './snackbar';
import registration from './registration';
import history from './history';
import cart from './cart';
import client from './client';

const reducers = combineReducers({
	authentication,
  	product,
	snackbar,
	registration,
	history,
	cart,
	client
});

export default reducers;
