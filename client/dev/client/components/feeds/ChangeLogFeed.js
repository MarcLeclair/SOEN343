import React from 'react';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const panelPadding = {
  padding: '2rem',
}

function ChangeLogFeed (props) {

  return (
    <Grid item xs={10} md={5} lg={4}>
      <Paper style={panelPadding}>
        <Typography type="display1" component="h3">
          Latest Updates
        </Typography><br /><br />
        <Typography type="title">New features</Typography>
        <Typography type="body2">
          <ul>
            <li>Clients can now delete their accounts</li>
            <li>Anyone can view the product catalog</li>
            <li>Added previous and next navigation on product details</li>
            <li>Cart items are now removable from cart</li>
          </ul>
        </Typography>
        <Typography type="title">Bug fixes</Typography>
        <Typography type="body2">
          <ul>
            <li>Missing fields in the product view now display</li>
            <li>Rerouting based on authentication fixed</li>
            <li>Stock updated when using prev and next navigation</li>
            <li>Logout now removes user type</li>
          </ul>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default (ChangeLogFeed);