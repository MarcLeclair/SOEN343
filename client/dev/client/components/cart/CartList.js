import React from 'react';
import PropTypes from 'prop-types';

import StopIcon from 'material-ui-icons/RemoveShoppingCart';
import Typography from 'material-ui/Typography';
import CartItem from './CartItem';
import List from 'material-ui/List';

class CartList extends React.Component {
	render() {
		return (
			<div> 
				{
					this.props.items.length > 0 &&
					<List>
						{
							this.props.items.map((item, index) => (
		          	<CartItem key={index} item={item} last={index >= this.props.items.length - 1}/>
		        	))
						}
        	</List>
				}
				{
					this.props.items.length < 1 &&
					<Typography type='headline' gutterBottom style={{ marginTop: '4rem', marginBottom: '4rem' }}>
						 Cannot checkout, your cart is empty. <StopIcon /> 
					</Typography>
				}
			</div>
		);
	}
}

CartList.propTypes = {
    items: PropTypes.arrayOf(Object).isRequired
};

export default CartList;