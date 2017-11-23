import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import { checkoutCart } from '../../actions/cart';

import green from 'material-ui/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'left',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Checkout extends React.Component {

	render() {
		const { classes } = this.props;
		const buttonClassname = classNames({
      [classes.buttonSuccess]: this.props.cart.checkedOut,
    });
		return (
			<div className={classes.root}>
				<div className={classes.wrapper}>
          <Button
            raised
            color="primary"
            className={buttonClassname}
            disabled={this.props.cart.isCheckingOut}
            onClick={this.props.checkoutCart}
          >
            Checkout Items
          </Button>
          {this.props.cart.isCheckingOut && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
			</div>
		);
	}
}

const mapStateToProps = ({cart}) => ({
	cart
});

const mapDispatchToProps = { 
	checkoutCart
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Checkout));