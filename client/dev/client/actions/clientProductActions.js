import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { forceLogoutOrError } from './index';
import { fetchInventory } from './adminProductActions';

export const addToCart = (productId) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            if (shouldAddToCart(getState())) {
                dispatch(addToCartRequest());

                return callApi(`api/carts/inventory/${productId}`, 'post', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        dispatch(addToCartSuccess(res));
                        dispatch(addToCartSuccessSnackbar());
                        dispatch(fetchInventory(productId));
                    },
                    error => forceLogoutOrError(error, dispatch, () => {
                        dispatch(addToCartFailure());
                    })
                );
            }
        }
    };
}

function shouldAddToCart(state) {
    if (!state.product.addToCart.addingToCart) {
        return true;
    } else {
        return false;
    }
}

export const addToCartRequest = () => { return { type: actions.ADD_TO_CART_REQUEST }; }

export const addToCartSuccess = (result) => { return { type: actions.ADD_TO_CART_SUCCESS }; }

export const addToCartFailure = (error) => { return { type: actions.ADD_TO_CART_FAILURE }; }

export const addToCartSuccessSnackbar = () => { return { type: actions.ADD_TO_CART_SUCCESS_SNACKBAR }; }