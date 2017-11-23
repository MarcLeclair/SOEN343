import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { forceLogoutOrError } from './index';

export const getHistoryOfProductsRequest = () => { return { type: actions.GET_HISTORY_OF_PRODUCTS_REQUEST }; }

export const getHistoryOfProductsSuccess = (products) => {
    return {
        type: actions.GET_HISTORY_OF_PRODUCTS_SUCCESS,
        products: products
    };
}

export const getHistoryOfProductsFailure = (error) => {
    return {
        type: actions.GET_HISTORY_OF_PRODUCTS_FAILURE,
        error: error
    };
}

function shouldGetHistoryOfProducts(state) {
    const products = state.history.products;

    if (!products || !state.history.isFetching) {
        return true;
    } else {
        return false;
    }
}

export const getHistoryOfProducts = () => {
    return function (dispatch, getState) {
        if (getState().authentication && getState().authentication.token) {
            if (shouldGetHistoryOfProducts(getState())) {
                dispatch(getHistoryOfProductsRequest());
                let endPoint = 'api/records';

                return callApi(endPoint, 'get', undefined, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        let products = [];

                        for (let i = 0; i < res.data.length; i++) {
                            let product = {};
                            product = res.data[i].inventoryType;
                            product.serialNumber = res.data[i].serialNumber;
                            product.returnDate = res.data[i].returnDate;
                            products.push(product);
                        }

                        dispatch(getHistoryOfProductsSuccess(products));
                    },
                    error => forceLogoutOrError(error, dispatch, () => {
                        dispatch(getHistoryOfProductsFailure(error));
                    })
                );
            }
        }
    };
}

export const refundProduct = (product) => {
    return function (dispatch, getState) {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/records/inventory/${product.serialNumber}`, 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
                res => dispatch(getHistoryOfProducts()),
                error => forceLogoutOrError(error, dispatch, () => {
                    console.log("error in refunding");
                })
            );
        }
    };
}