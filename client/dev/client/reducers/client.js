import * as actions from '../actions/action-types.js'

const initialState = {
    isFetchingClients: false,
    clients: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.FETCH_CLIENTS:
      	return { ...state, isFetchingClients: true };
      	break;
    case actions.RECEIVE_CLIENTS:
      	return { ...state, isFetchingClients: false, clients: action.clients };
      	break;
		default:
      return state;
	}
}