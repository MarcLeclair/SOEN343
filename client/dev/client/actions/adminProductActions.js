import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { getProducts } from './productView';
import { customSnackbar, forceLogoutOrError } from './index';

// -----------------------------------------------
//                MODIFY PRODUCT
//------------------------------------------------
export const modifyProduct = (body) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token && getState().product.modifyProduct) {
            if (shouldModifyProduct(getState())) {
                dispatch(modifyProductRequest());

                body = {
                    ...body,
                    camera: (body.camera) ? 'true' : 'false',
                    electronictype: body.electronicType,
                    displaysize: body.displaySize,
                    harddrive: body.hardDrive,
                    touchscreen: (body.touchscreen) ? 'true' : 'false',
                    touchScreen: (body.touchscreen) ? 'true' : 'false'
                };

                return callApi(`api/products/${getState().product.dropDownsProduct.id}`, 'put', body, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        if (res.data) {
                            dispatch(modifyProductSuccess(res));
                            dispatch(modifyProductSuccessSnackbar());
                            dispatch(getProducts());
                        } else {
                            let message = 'Error in one or more input fields.';

                            if (res.error && res.error.message) {
                                message = res.error.message;
                            }

                            dispatch(customSnackbar(message));
                            dispatch(modifyProductFailure());
                        }
                    },
                    error => forceLogoutOrError(error, dispatch, () => {
                          dispatch(modifyProductFailure());
                        }
                      )
                );
            }
        }
    };
}

function shouldModifyProduct(state) {
    if (!state.product.modifyProduct.modifyingProduct) {
        return true;
    } else {
        return false;
    }
}

export const modifyProductRequest = () => { return { type: actions.MODIFY_PRODUCT_REQUEST }; }

export const modifyProductSuccess = () => { return { type: actions.MODIFY_PRODUCT_SUCCESS }; }

export const modifyProductFailure = () => { return { type: actions.MODIFY_PRODUCT_FAILURE }; }

export const modifyProductSuccessSnackbar = () => { return { type: actions.MODIFY_PRODUCT_SUCCESS_SNACKBAR }; }

// -----------------------------------------------
//                ADD PRODUCT
//------------------------------------------------
export const addProduct = (body) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            if (shouldAddProduct(getState())) {
                dispatch(addProductRequest());

                body = {
                    ...body,
                    camera: (body.camera) ? 'true' : 'false',
                    electronictype: body.electronicType,
                    displaysize: body.displaySize,
                    harddrive: body.hardDrive,
                    touchscreen: (body.touchscreen) ? 'true' : 'false',
                    touchScreen: (body.touchscreen) ? 'true' : 'false'
                };

                return callApi('api/products', 'post', body, `Bearer ${getState().authentication.token}`).then(
                    res => {
                        if (res.data) {
                            dispatch(addProductSuccess(res));
                            dispatch(addProductSuccessSnackbar());
                            dispatch(getProducts());
                        } else {
                            let message = 'Error in one or more input fields.';

                            if (res.error && res.error.message) {
                                message = res.error.message;
                            }

                            dispatch(customSnackbar(message));
                            dispatch(addProductFailure());
                        }
                    },
                    error => forceLogoutOrError(error, dispatch, () => {
                          dispatch(addProductFailure());
                        }
                      )
                );
            }
        }
    };
}


function shouldAddProduct(state) {
    if (!state.product.addProduct.addingProduct) {
        return true;
    } else {
        return false;
    }
}

export const addProductRequest = () => { return { type: actions.ADD_PRODUCT_REQUEST }; }

export const addProductSuccess = (result) => { return { type: actions.ADD_PRODUCT_SUCCESS }; }

export const addProductFailure = (error) => { return { type: actions.ADD_PRODUCT_FAILURE }; }

export const addProductSuccessSnackbar = () => { return { type: actions.ADD_PRODUCT_SUCCESS_SNACKBAR }; }

// -----------------------------------------------
//                DELETE PRODUCT
//------------------------------------------------
export const deleteProduct = (product) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/products/${product.id}`, 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
                res => dispatch(getProducts()),
                error => forceLogoutOrError(error, dispatch, () => {
                      console.log("error in deleting");
                    }
                  )
            );
        }
    };
}

// -----------------------------------------------
//             PRODUCT INVENTORY
//------------------------------------------------
export const fetchInventory = (productId) => {
    return (dispatch, getState) => {
        dispatch(fetchInventoryRequest());
        return callApi(`api/inventories/product/${productId}`, 'get').then(
            res => dispatch(receiveInventoryCount(res)),
            error => forceLogoutOrError(error, dispatch, () => {
                dispatch(receiveInventoryCount({ count: 0 }));
            })
        );
    }
}

export const fetchInventoryRequest = () => { return { type: actions.GET_INVENTORY_COUNT}; }

export const receiveInventoryCount = (inventory) => { 
    var count = (inventory.count === undefined)?0:inventory.count;
    return { type: actions.RECEIVE_INVENTORY_COUNT, count }; 
}

export const addToInventory = (productId) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/inventories/product/${productId}`, 'post', undefined, `Bearer ${getState().authentication.token}`).then(
                res => console.log("added to inventory"),
                error => forceLogoutOrError(error, dispatch, () => {
                    console.log("failed to add to inventory");
                })
            );
        }
    }
}

export const removeFromInventory = (productId) => {
    return (dispatch, getState) => {
        if (getState().authentication && getState().authentication.token) {
            return callApi(`api/inventories/product/${productId}`, 'delete', undefined, `Bearer ${getState().authentication.token}`).then(
                res => console.log("removed from inventory"),
                error => forceLogoutOrError(error, dispatch, () => {
                    console.log("failed to remove from inventory");
                })
            );
        }
    }
}
