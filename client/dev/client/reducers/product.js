import { SET_PRODUCTs_FILTER, GET_PRODUCTS_REQUEST, GET_PRODUCTS } from '../actions/action-types.js'

const initialState = {
    isFetching: false,
    error: "",
    productFilter: {},
    products: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_FILTER:
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
        default:
            return state;
    }
}