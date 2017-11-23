import * as actions from '../actions/action-types';

const initialState = { open: false };

export default function (state = initialState, action) {
    switch (action.type) {
    	case actions.SHOW_SNACKBAR:
      	return { ...state, open: true };
      	break;
      case actions.HIDE_SNACKBAR:
      	return { ...state, open: false };
      	break;
      case actions.REJECT_LOGIN:
      	return { ...state, open: true, message: (action.message === undefined)?"Invalid credentials, try again.":action.message };
      	break;
      case actions.ACCEPT_REGISTRATION:
        return { ...state, open: true, message: "Successfully created account." };
        break;
      case actions.ADD_PRODUCT_SUCCESS_SNACKBAR:
        return { ...state, open: true, message: "Successfully added product." };
        break;
      case actions.MODIFY_PRODUCT_SUCCESS_SNACKBAR:
        return { ...state, open: true, message: "Successfully modified product." };
        break;
      case actions.ADD_TO_CART_SUCCESS_SNACKBAR:
        return { ...state, open: true, message: "Successfully added product to cart." };
        break;
      case actions.CUSTOM_SNACKBAR_MESSAGE:
        return { ...state, open: true, message: action.message }
        break;
      default:
        return state;
    }
    return state;
}