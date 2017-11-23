import React from 'react';
import PropTypes from 'prop-types';

import StopIcon from 'material-ui-icons/RemoveShoppingCart';
import Typography from 'material-ui/Typography';
import ClientItem from './ClientItem';
import List from 'material-ui/List';

class ClientList extends React.Component {
	render() {
		return (
			<div> 
				{
					this.props.clients.length > 0 &&
					<List>
						{
							this.props.clients.map((client, index) => (
		          	<ClientItem key={index} client={client} last={index >= this.props.clients.length - 1}/>
		        	))
						}
        	</List>
				}
				{
					this.props.clients.length < 1 &&
					<Typography type='headline' gutterBottom style={{ marginTop: '4rem', marginBottom: '4rem' }}>
						 There are no clients registered in the system. 
					</Typography>
				}
			</div>
		);
	}
}

ClientList.propTypes = {
    clients: PropTypes.arrayOf(Object).isRequired
};

export default ClientList;