import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button'; 
import Typography from 'material-ui/Typography';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import { removeCartItem } from '../../actions/cart';

class CartDeleteDialog extends Component {

	render() {
    const message = `Are you sure you wish to remove this ${this.props.cart.selectedItem.brand} 
      ${this.props.cart.selectedItem.electronicType} product from your cart?`;
		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>Remove from cart?</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.props.removeCartItem(this.props.cart.selectedItem); this.props.handleRequestClose()}} color="accent">
              Remove
            </Button>
            <Button onClick={this.props.handleRequestClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ cart }) => ({
  cart
});

const mapDispatchToProps = {
  removeCartItem
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDeleteDialog);