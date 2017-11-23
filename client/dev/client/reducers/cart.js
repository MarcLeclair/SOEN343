import * as actions from '../actions/action-types.js'

const initialState = {
    isFetchingCart: false,
    isCheckingOut: false,
    checkedOut: false,
    deleteDialogOpened: false,
    selectedItem: {},
    inventory: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.FETCH_CART_ITEMS:
    	return { ...state, isFetchingCart: true, inventory: [] };
    	break;
    case actions.RECEIVE_CART_ITEMS:
    	return { ...state, isFetchingCart: false, inventory: action.items, checkedOut: false };
    	break;
    case actions.CHECKOUT_CART:
      return { ...state, isCheckingOut: true };
      break;
    case actions.RECEIVE_CHECKOUT_CART_RESULT:
      return { ...state, isCheckingOut: false, checkedOut: true };
      break;
    case actions.SHOW_DELETE_CART_ITEM:
      return { ...state, deleteDialogOpened: true, selectedItem: action.item };
      break;
    case actions.HIDE_DELETE_CART_ITEM:
      return { ...state, deleteDialogOpened: false };
      break;
		default:
      return state;
	}
}