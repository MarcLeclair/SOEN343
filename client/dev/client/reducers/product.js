import { SET_PRODUCTS_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, SHOW_PRODUCT_VIEW, HIDE_PRODUCT_VIEW } from '../actions/action-types.js'

const initialState = {
    isFetching: false,
    error: "",
    productFilter: {},
    products: [],
    productViewOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_FILTER:
            return {
                ...state,
                productFilter: action.filter
            };
            break;
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
            break;
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products
            };
            break;
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
            break;
        case SHOW_PRODUCT_VIEW:
            return { ...state, productViewOpen: true };
            break;
        case HIDE_PRODUCT_VIEW:
            return { ...state, productViewOpen: false };
            break;
        default:
            return state;
    }
}