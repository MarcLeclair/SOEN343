import React from 'react';
import { connect } from 'react-redux';
import HistoryOfProductsList from './HistoryOfProductsList';
import ProductViewDialog from '../products/ProductViewDialog';
import HistoryRefundDialog from './HistoryRefundDialog';
import DeleteAccount from './DeleteAccount';
import * as actions from '../../actions';
import { getHistoryOfProducts } from '../../actions/historyView';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import { LinearProgress } from 'material-ui/Progress';

const historyPaperStyle = {
	padding: '2em'
};

class HistoryPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		return (
			<div style={{ marginTop: '30px' }}> 
				<Grid container spacing={0} justify='center'>
					<Grid item xs={11} md={10} lg={6} >
						<Paper style={historyPaperStyle}>
							<Grid container spacing={24} justify='center'>
								<Grid item xs={12}>
									<Typography type='display1' gutterBottom component='h3'>
										Previous Purchases
									</Typography>
								</Grid>
							</Grid>
							{ this.props.history.isFetching && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.history.isFetching && <HistoryOfProductsList /> }
						</Paper>
						<DeleteAccount/>
					</Grid>
				</Grid>
				<ProductViewDialog open={this.props.product.productViewOpen} handleRequestClose={this.props.hideProductView} actions={false} />
				<HistoryRefundDialog open={this.props.history.refundDialogOpen} handleRequestClose={this.props.hideRefundDialog} />
	      		<Snackbar
		          anchorOrigin={{
		            vertical: 'bottom',
		            horizontal: 'left',
		          }}
		          open={this.props.snackbar.open}
		          autoHideDuration={3000}
		          onRequestClose={this.props.hideSnackbar}
		          SnackbarContentProps={{
		            'aria-describedby': 'message-id',
		          }}
		          message={<span id="message-id">{this.props.snackbar.message}</span>}
		        />
			</div>
		);
	}
}

const mapStateToProps = ({authentication, product, history, snackbar}) => ({
	authentication,
	product,
	history,
	snackbar
});

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => dispatch(getHistoryOfProducts()),
		hideProductView: () => dispatch(actions.hideProductView()),
		hideSnackbar: () => dispatch(actions.hideSnackbar()),
		hideRefundDialog: () => dispatch(actions.hideRefundDialog())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);