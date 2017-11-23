import * as actions from '../actions/action-types.js';

const initialState = {
	isFetching: false,
	error: "",
	products: [],
	refundDialogOpen: false,
	selectedItemForRefund: {}
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
				...state,
				isFetching: false,
				error: action.error
			};
			break;
		case actions.SHOW_REFUND_DIALOG:
			return {
				...state,
				selectedItemForRefund: action.product,
				refundDialogOpen: true
			};
			break;
		case actions.HIDE_REFUND_DIALOG:
			return {
				...state,
				refundDialogOpen: false
			};
			break;
		default:
			return state;
	}
}