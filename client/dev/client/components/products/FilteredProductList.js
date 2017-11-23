import { connect } from 'react-redux';
import ProductList from './ProductList';

import { setPriceSort, getProducts, showSpecificProductPage, setRowsPerPage, setPage } from '../../actions/productView';
import { showProductView, showDeleteProduct } from '../../actions';

const mapStateToProps = state => {
    return {
        userType: state.authentication.userType,
        currPage: state.product.page,
        numPages: state.product.numPages,
        products: state.product.products,
        numItems: state.product.numProducts,
        numItemsPerPage: state.product.productsPerPage,
        pagination: true,
        priceSort: true,
        deleteLabel: "Delete Specification"
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (product) => {
            dispatch(showProductView(product));
        },
        onProductDelete: (product) => {
            dispatch(showDeleteProduct(product));
        },
        gotoPage: (event, number) => {
            dispatch(showSpecificProductPage(number + 1));
        },
        changeRowsPerPage: (event) => {
            dispatch(setPage(1));
            dispatch(setRowsPerPage(event.target.value));
        },
        onSort: (priceSort) => {
            dispatch(setPriceSort(priceSort));
            dispatch(getProducts());
        },
    };
}

const FilteredProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default FilteredProductList;