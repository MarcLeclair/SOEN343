import * as actions from '../actions/action-types.js';

const initialState = {
	isFetching: false,
	error: "",
	products: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.GET_HISTORY_OF_PRODUCTS_REQUEST:
			return {
				...state,
				isFetching: true,
			};
			break;
		case actions.GET_HISTORY_OF_PRODUCTS_SUCCESS:
			return {
				...state,
				isFetching: false,
				products: action.products
			};
			break;
		case actions.GET_HISTORY_OF_PRODUCTS_FAILURE:
			return {
				isFetching: false,
				error: action.error
			};
			break;
		default:
			return state;
	}
}