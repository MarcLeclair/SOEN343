import React from 'react';

import Typography from 'material-ui/Typography';
import { ListItem, ListItemText } from 'material-ui/List';
import Face from 'material-ui-icons/Face';
import Avatar from 'material-ui/Avatar';

class ClientItem extends React.Component {
	render() {
		return (
			<span>
				<ListItem>
	        <Avatar>
	          <Face />
	        </Avatar>
	        <ListItemText primary={`${this.props.client.fname} ${this.props.client.lname}`} secondary={`Email: ${this.props.client.email}`} />
	      </ListItem>
      </span>
		);
	}
}

export default ClientItem;