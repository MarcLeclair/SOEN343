import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import CartList from './CartList';
import Checkout from './Checkout';
import CartDeleteDialog from './CartDeleteDialog';
import { fetchCartItems, hideCartDeleteDialog } from '../../actions/cart';

const productPaperStyle = {
	padding: '2em'
};

class CartView extends React.Component {

	componentDidMount() {
		this.props.fetchCartItems();
	}

	render() {
		return (
			<div style={{ marginTop: '30px' }}> 
				<Grid container spacing={0} justify='center'>
					<Grid item xs={11} md={10} lg={6} >
						<Paper style={productPaperStyle}>
							<Grid container spacing={24} justify='center'>
								<Grid item xs={12}>
									<Typography type='display1' gutterBottom component='h3'>
										Cart Items
									</Typography>
								</Grid>
							</Grid>
							{ this.props.cart.inventory.length > 0 && !this.props.cart.checkedOut &&
								<Typography type='subheading' gutterBottom>
									Manage your cart items and checkout before your items are placed back into inventory.
								</Typography>
							}
							{ this.props.cart.checkedOut &&
								<Typography type='subheading' gutterBottom>
									Cart Items successfully purchased. You will be able to view them in purchase history.
								</Typography>
							}
							{ this.props.cart.isFetchingCart && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.cart.isFetchingCart && !this.props.cart.checkedOut && <CartList items = {this.props.cart.inventory}/> }
							{ this.props.cart.inventory.length > 0 && !this.props.cart.checkedOut && <Checkout/> }
							<CartDeleteDialog open={this.props.cart.deleteDialogOpened} handleRequestClose={this.props.hideCartDeleteDialog} />
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = ({cart}) => ({
	cart
});

const mapDispatchToProps = { 
	fetchCartItems,
	hideCartDeleteDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);