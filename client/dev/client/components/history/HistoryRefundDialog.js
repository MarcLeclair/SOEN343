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

import { refundProduct } from '../../actions/historyView';

class HistoryRefundDialog extends Component {

	render() {
    const message = `Are you sure you wish to refund this ${this.props.history.selectedItemForRefund.brand} 
      ${this.props.history.selectedItemForRefund.electronicType} product?`;
		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>Refund Product?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { this.props.refundProduct(this.props.history.selectedItemForRefund); this.props.handleRequestClose()}} color="accent">
              Refund
            </Button>
            <Button onClick={this.props.handleRequestClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ history }) => ({
  history
});

const mapDispatchToProps = {
  refundProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRefundDialog);