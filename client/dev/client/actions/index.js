import callApi from '../utils/apiCaller';
import * as actions from './action-types';
import { fetchInventory } from './adminProductActions';

export const forceLogoutOrError = (error, dispatch, callback) =>{
    if(error.status === 401){
        dispatch(deleteToken());
        dispatch(deleteUserType());
    }else{
        callback();
    }
}

// -----------------------------------------------
//                    TOKEN
//------------------------------------------------
export const setToken = (token) => {
    return {
        type: actions.SET_TOKEN,
        token: token
    };
}

export const deleteToken = () => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
          return callApi('api/users/logout', 'post', undefined, `Bearer ${getState().authentication.token}`).then(
              res => {
                    dispatch(resetFilters());
                    dispatch({
                        type: actions.DELETE_TOKEN
                    });
                },
              error => {
                    dispatch(resetFilters());
                    dispatch({
                        type: actions.DELETE_TOKEN
                    });
                    console.log(error)
                }
          );
        }
    }
};

// -----------------------------------------------
//                    FILTERS
//------------------------------------------------
export const resetFilters = () => { return { type: actions.RESET_FILTERS }; }

// -----------------------------------------------
//                    USERTYPE
//------------------------------------------------
export const setUserType = (userType) => {
    return {
        type: actions.SET_USER_TYPE,
        userType: userType
    };
}

export const deleteUserType = () => { return { type: actions.DELETE_USER_TYPE }; }

// -----------------------------------------------
//                 SNACKBAR
//------------------------------------------------
export const showSnackbar = () => { return { type: actions.SHOW_SNACKBAR }; }

export const hideSnackbar = () => { return { type: actions.HIDE_SNACKBAR }; }

export const customSnackbar = (message) => { return { type: actions.CUSTOM_SNACKBAR_MESSAGE, message: message }; }

// -----------------------------------------------
//             PRODUCT VIEW MODAL
//------------------------------------------------
export const showProductView = (product) => {
    return (dispatch, getState) => {
        dispatch(fetchInventory(product.id));
        dispatch({ 
    		type: actions.SHOW_PRODUCT_VIEW_DIALOG,
    		product
    	});
    }
}

export const hideProductView = () => { return { type: actions.HIDE_PRODUCT_VIEW_DIALOG }; }

// -----------------------------------------------
//              ADD PRODUCT MODAL
//------------------------------------------------
export const showAddProduct = () => { return { type: actions.SHOW_ADD_PRODUCT_DIALOG }; }

export const hideAddProduct = () => { return { type: actions.HIDE_ADD_PRODUCT_DIALOG }; }

// -----------------------------------------------
//             DELETE PRODUCT MODAL
//------------------------------------------------
export const showDeleteProduct = (product) => {
    return { 
		type: actions.SHOW_DELETE_PRODUCT_DIALOG,
		product
	};
}

export const hideDeleteProduct = () => { return { type: actions.HIDE_DELETE_PRODUCT_DIALOG }; }

// -----------------------------------------------
//             MODIFY PRODUCT MODAL
//------------------------------------------------
export const showModifyProduct = (product) => { 
    return { 
        type: actions.SHOW_MODIFY_PRODUCT_DIALOG,
        product
    }; 
}

export const hideModifyProduct = () => { return { type: actions.HIDE_MODIFY_PRODUCT_DIALOG }; }

// -----------------------------------------------
//              REGISTRATION MODAL
//------------------------------------------------
export const showRegistration = () => { return { type: actions.SHOW_REGISTRATION }; }

export const hideRegistration = () => { return { type: actions.HIDE_REGISTRATION }; }

// -----------------------------------------------
//              REFUND MODAL
//------------------------------------------------
export const showRefundDialog = (product) => { 
    return { 
        type: actions.SHOW_REFUND_DIALOG,
        product: product
    }; 
}

export const hideRefundDialog = () => { return { type: actions.HIDE_REFUND_DIALOG }; }