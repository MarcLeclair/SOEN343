import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
require('../../scss/style.scss');
import CartIcon from 'material-ui-icons/ShoppingCart';

import { setToken, deleteToken, setUserType, deleteUserType } from '../actions/index';
import Login from './authentication/Login';
import ProductPage from './products/ProductPage';
import HistoryPage from './history/HistoryPage';
import CartView from './cart/CartView';
import ClientView from './clients/ClientView';

const styles = theme => ({
	root: {
    width: '100%',
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

class App extends Component {
	
	componentWillMount(){
		const token = getCookie("token");
		const userType = getCookie("userType");
		if(token !== undefined){
			this.props.setToken(token);
		} else {
			this.props.deleteToken();
		}
		if(userType !== undefined){
			this.props.setUserType(userType);
		}else {
      		this.props.deleteUserType();
		}
	}

	componentWillReceiveProps(nextProps){
		const authentication = nextProps.authentication;
		if((authentication === undefined ||  
			 authentication.token === undefined) && window.location.hash !== "#/products"){
			window.location.hash = "#/";
		}
		else if(window.location.hash === "#/" && authentication !== undefined && authentication.token !== undefined ){
			window.location.hash = "#/products";
		}
	}

	render() {
		const classes = this.props.classes;
		return (
			<Router>
			  <MuiThemeProvider theme={theme}>
				  <div className={classes.root}>
				    <AppBar position="static">
					    <Toolbar>
						<Typography style={{ flex: '1' }} type="title" color="inherit" onClick={() => window.location.hash = "#/"}>
							Pixel Performance
						</Typography>
						<Button color="contrast" onClick={ () => window.location.hash = "#/products" }> Products</Button>
						{ this.props.authentication.token !== undefined && this.props.authentication.userType === "Admin" &&
							<Button color="contrast" onClick={() => window.location.hash = "#/clients"}> Clients</Button> 
						}
						{ this.props.authentication.token !== undefined && this.props.authentication.userType === "Client" &&
							<Button color="contrast" onClick={ () => window.location.hash = "#/cart" }> Cart</Button>
						}
						{ this.props.authentication.token !== undefined && this.props.authentication.userType === "Client" &&
							<Button color="contrast" onClick={ () => window.location.hash = "#/history" }> Account</Button>
						}
						{ this.props.authentication.token !== undefined &&
							<Button color="contrast" onClick={() => {this.props.deleteToken(); this.props.deleteUserType()}}>Logout</Button> 
						}
						</Toolbar>
				    </AppBar>
				    <Route exact path="/" component={Login} />
				    <Route path="/products" component={ProductPage} />
				    <Route path="/history" component={HistoryPage} />
				    <Route path="/cart" component={CartView} />
				    <Route path="/clients" component={ClientView} />
				  </div>
			  </MuiThemeProvider>
		  </Router>
		  )
	}

};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = {
	setToken,
	deleteToken,
	setUserType,
	deleteUserType
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
