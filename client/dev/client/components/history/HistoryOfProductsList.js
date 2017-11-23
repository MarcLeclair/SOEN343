import { connect } from 'react-redux';
import ProductList from '../products/ProductList';

import { showProductView, showRefundDialog } from '../../actions';

const mapStateToProps = state => {
    return {
        userType: state.authentication.userType,
        pageType: "history",
        products: state.history.products,
        pagination: false,
        deleteLabel: "Refund",
        priceSort: false
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onProductClick: (product) => {
            dispatch(showProductView(product));
        },
        onProductDelete: (product) => {
            dispatch(showRefundDialog(product));
        }
    };
}

const HistoryOfProductsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

export default HistoryOfProductsList;