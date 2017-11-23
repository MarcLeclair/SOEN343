import { ATTEMPT_LOGIN, ACCEPT_LOGIN, SET_TOKEN, DELETE_TOKEN, SET_USER_TYPE, DELETE_USER_TYPE, REJECT_LOGIN } from '../actions/action-types';

const initialState = {
  loading: false,
  userType: undefined
};

export default function (state = initialState, action) {
    switch (action.type) {
      case ATTEMPT_LOGIN:
        return { ...state, loading: true };
        break;
      case ACCEPT_LOGIN:
      	document.cookie = "token=" + action.token;
        document.cookie = "userType=" + action.userType;
      	return { ...state, token: action.token, userType: action.userType, loading: false };
      	break;
      case REJECT_LOGIN:
      	return { ...state, token: undefined, userType: undefined, loading: false };
      	break;
      case SET_TOKEN:
      	return { ...state, token: action.token, userType: action.userType };
      	break;
      case DELETE_TOKEN:
      	document.cookie ='token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      	return { ...state, token: undefined };
      	break;
      case SET_USER_TYPE:
        return { ...state, userType: action.userType };
        break;
      case DELETE_USER_TYPE:
        document.cookie ='userType=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return { ...state, userType: undefined };
        break;
    }
    return state;
}