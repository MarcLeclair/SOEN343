import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import ClientList from './ClientList';
import { fetchClients } from '../../actions/client';

const productPaperStyle = {
	padding: '2em'
};

class CartView extends React.Component {

	componentDidMount() {
		this.props.fetchClients();
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
										List of Clients
									</Typography>
								</Grid>
							</Grid>
							{ this.props.client.isFetchingClients && <LinearProgress color="accent" style={{ width: '100%' }} /> }
							{ !this.props.client.isFetchingClients && <ClientList clients={this.props.client.clients}/> }
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = ({client}) => ({
	client
});

const mapDispatchToProps = { 
	fetchClients
};

export default connect(mapStateToProps, mapDispatchToProps)(CartView);