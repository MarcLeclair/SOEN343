import * as actions from '../actions/action-types.js';

const defaultDropDownsProduct = {
    id: '',
    weight: '',
    modelNumber: '',
    brand: '',
    price: '',
    electronicType: 'Monitor',
    processor: '',
    ram: '',
    hardDrive: '',
    cpus: '',
    os: '',
    dimensions: '',
    type: '',
    displaySize: '',
    battery: '',
    camera: '',
    touchscreen: '',
    size: ''
};
const defaultFilters = {
    electronicType: 'Type',
    priceLow: '',
    priceHigh: '',
    maxSize: '',
    maxWeight: '',
    brand: 'Brand'
};

const initialState = {
    isFetchingInventory: false,
    isFetching: false,
    filterSet: false,
    inventoryCount: 0,
    error: "",
    productFilter: "",
    filters: defaultFilters,
    products: [],
    productViewOpen: false,
    productDeleteOpen: false,
    addProduct: {
        addingProduct: false,
        addProductOpen: false,
        error: false
    },
    addToCart: {
        addingToCart: false,
        error: false
    },
    modifyProduct: {
        modifyingProduct: false,
        modifyProductOpen: false,
        error: false
    },
    dropDownsProduct: defaultDropDownsProduct,
    selectedProduct: {},
    page: 1,
    productsPerPage: 10,
    numProducts: 0,
    brands: [],
    priceSort: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.SET_PRODUCTS_FILTER:
            return {
                ...state,
                filters: action.filters,
                filterSet: true
            };
            break;
        case actions.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
            break;
        case actions.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                isFetching: false,
            };
            break;
        case actions.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetching: false,
                filterSet: false
            };
            break;
        case actions.SHOW_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: true, selectedProduct: action.product };
            break;
        case actions.HIDE_PRODUCT_VIEW_DIALOG:
            return { ...state, productViewOpen: false };
            break;
        case actions.SET_PRODUCT:
            return { ...state, selectedProduct: action.product };
            break;
        case actions.SHOW_DELETE_PRODUCT_DIALOG:
            return { ...state, productDeleteOpen: true, selectedProduct: action.product };
            break;
        case actions.HIDE_DELETE_PRODUCT_DIALOG:
            return { ...state, productDeleteOpen: false };
            break;
        case actions.SHOW_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: true 
                },
                dropDownsProduct: defaultDropDownsProduct
            };
            break;
        case actions.HIDE_ADD_PRODUCT_DIALOG:
            return { 
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addProductOpen: false
                }
            };
            break;
        case actions.ADD_PRODUCT_REQUEST:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    addingProduct: true,
                    error: false
                }
            };
            break;
        case actions.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    error: false,
                    addingProduct: false,
                    addProductOpen: false
                }
            };
            break;
        case actions.ADD_PRODUCT_FAILURE:
            return {
                ...state,
                addProduct: {
                    ...state.addProduct,
                    error: true,
                    addingProduct: false
                }
            };
            break;
        case actions.SHOW_MODIFY_PRODUCT_DIALOG:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyProductOpen: true
                },
                dropDownsProduct: {
                    ...defaultDropDownsProduct,
                    ...action.product
                },
                productViewOpen: false
            };
            break;
        case actions.HIDE_MODIFY_PRODUCT_DIALOG:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyProductOpen: false
                }
            };
            break;
        case actions.MODIFY_PRODUCT_REQUEST:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: true,
                    error: false
                }
            };
            break;
        case actions.MODIFY_PRODUCT_SUCCESS:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: false,
                    error: false,
                    modifyProductOpen: false
                }
            };
            break;
        case actions.MODIFY_PRODUCT_FAILURE:
            return {
                ...state,
                modifyProduct: {
                    ...state.modifyProduct,
                    modifyingProduct: false,
                    error: true
                }
            };
            break;
        case actions.SET_PRODUCT_PAGE:
            return {
                ...state,
                page: action.pageNumber
            };
            break;
        case actions.SET_ROWS_PER_PAGE:
            return {
                ...state,
                productsPerPage: action.rowsPerPage
            };
            break;
        case actions.SET_NUM_PRODUCTS:
            return {
                ...state,
                numProducts: action.numProducts
            };
            break;
        case actions.ADD_TO_CART_REQUEST:
            return {
                ...state,
                addToCart: {
                    ...state.addToCart,
                    addingToCart: true,
                    error: false
                }
            };
            break;
        case actions.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addToCart: {
                    ...state.addToCart,
                    error: false,
                    addingToCart: false
                }
            };
            break;
        case actions.ADD_TO_CART_FAILURE:
            return {
                ...state,
                addToCart: {
                    ...state.addToCart,
                    error: true,
                    addingToCart: false
                }
            };
            break;
        case actions.GET_INVENTORY_COUNT:
            return {
                ...state,
                isFetchingInventory: true
            }
        case actions.RECEIVE_INVENTORY_COUNT:
            return {
                ...state,
                isFetchingInventory: false,
                inventoryCount: action.count
            }
        case actions.RESET_FILTERS:
            return {
                ...state,
                filters: defaultFilters,
            }
        case actions.GET_BRANDS:
            return {
                ...state,
                brands: action.brands,
            }
        case actions.GET_BRANDS_FAILURE:
            return {
                ...state,
                error: true
            };
            break;
        case actions.SET_PRICE_SORT:
            return {
                ...state,
                priceSort: action.priceSort,
                filterSet: true
            };
            break;
        default:
            return state;
    }
}