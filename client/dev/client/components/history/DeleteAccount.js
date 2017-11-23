import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { deleteClient } from '../../actions/client';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

const deletePaperStyle = {
	padding: '2em',
	marginTop: '3em',
	marginBottom: '3em'
};

class DeleteAccount extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Paper style={deletePaperStyle}>
				<Grid container spacing={24} justify='center'>
					<Grid item xs={12}>
						<Typography type='display1' gutterBottom component='h3'>
							Delete Account
						</Typography>
						<Typography type='body1' gutterBottom>
							WARNING: Deleting your account will result in you losing your purchase history and your current unpurchased cart items. 
							This deletion will also result in your inability to log back into the system and will force you to register for a new account for your next purchase.
						</Typography>
					</Grid>
				</Grid><br/>
				<Button onClick={() => {this.props.deleteClient(); window.location.hash = "#/"}} color="accent" raised>I Understand, Delete my Account</Button>
			</Paper>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	deleteClient
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);