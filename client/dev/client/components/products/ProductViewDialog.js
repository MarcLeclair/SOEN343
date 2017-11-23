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
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';

import { addToInventory, removeFromInventory, fetchInventory } from '../../actions/adminProductActions';
import { showModifyProduct } from '../../actions';
import { addToCart } from '../../actions/clientProductActions';
import { previousProduct, nextProduct } from '../../actions/productView';

class ProductViewDialog extends Component {

  constructor(props){
    super(props);
    this.state = {
      showInventory: false,
      inventory: 0
    }

    this.toggleInventoryView = () => {
      this.setState({ ...this.state, showInventory: !this.state.showInventory });
    }

    this.addInventory = () => {
      this.setState({ ...this.state, inventory: this.state.inventory + 1 });
      this.props.addToInventory(this.props.product.selectedProduct.id);
    }

    this.removeInventory = () => {
      this.setState({ ...this.state, inventory: Math.max(this.state.inventory - 1, 0) });
      if(this.state.inventory > 0){
        this.props.removeFromInventory(this.props.product.selectedProduct.id);
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({ ...this.state, inventory: nextProps.product.inventoryCount });
  }

	render() {
    let previousDisabled = this.props.product.products.length == 0 || Object.keys(this.props.product.selectedProduct).length == 0
                            || (this.props.product.page == 1 && this.props.product.selectedProduct.id == this.props.product.products[0].id);
    let nextDisabled = this.props.product.products.length == 0 || Object.keys(this.props.product.selectedProduct).length == 0
                        || (this.props.product.page == Math.floor(this.props.product.numProducts / this.props.product.productsPerPage) + 1
                        && this.props.product.selectedProduct.id == this.props.product.products[this.props.product.products.length - 1].id);

		return (
				<Dialog open={this.props.open} transition={Slide} onRequestClose={this.props.handleRequestClose}>
          <DialogTitle>{`Item ${this.props.product.selectedProduct.brand} ${this.props.product.selectedProduct.electronicType}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Brand: </strong>{this.props.product.selectedProduct.brand}<br/>
              <strong>Type: </strong>{this.props.product.selectedProduct.electronicType}<br/>
              <strong>Price: </strong>{`$${this.props.product.selectedProduct.price} CDN`}<br/>
              <strong>Weight: </strong>{`${this.props.product.selectedProduct.weight} lbs`}<br/>
              { this.props.product.selectedProduct.size !== undefined &&
                <span><strong>Size: </strong>{this.props.product.selectedProduct.size}<br/></span>
              }
              { this.props.product.selectedProduct.processor !== undefined &&
                <span><strong>Processor: </strong>{`${this.props.product.selectedProduct.processor} Ghz`}<br/></span>
              }
              { this.props.product.selectedProduct.cpus !== undefined &&
                <span><strong>CPUs: </strong>{`${this.props.product.selectedProduct.cpus} cores`}<br/></span>
              }
              { this.props.product.selectedProduct.ram !== undefined &&
                <span><strong>RAM: </strong>{this.props.product.selectedProduct.ram} GB<br/></span>
              }
              { this.props.product.selectedProduct.hardDrive !== undefined &&
                <span><strong>Hard Drive: </strong>{this.props.product.selectedProduct.hardDrive} GB<br/></span>
              }
              { this.props.product.selectedProduct.dimensions !== undefined &&
                <span><strong>Dimensions: </strong>{this.props.product.selectedProduct.dimensions}<br/></span>
              }
              { this.props.product.selectedProduct.os !== undefined &&
                <span><strong>OS: </strong>{this.props.product.selectedProduct.os}<br/></span>
              }
              { this.props.product.selectedProduct.battery !== undefined &&
                <span><strong>Battery: </strong>{this.props.product.selectedProduct.battery}<br/></span>
              }
              { this.props.product.selectedProduct.touchscreen !== undefined &&
                <span><strong>Touchscreen: </strong>{this.props.product.selectedProduct.touchscreen ? "Yes": "No"}<br/></span>
              }
              { this.props.product.selectedProduct.camera !== undefined &&
                <span><strong>Touchscreen: </strong>{this.props.product.selectedProduct.camera ? "Yes": "No"}<br/></span>
              }
              { this.props.product.selectedProduct.displaySize !== undefined &&
                <span><strong>Display Size: </strong>{this.props.product.selectedProduct.displaySize}<br/></span>
              }
              {this.props.authentication.userType !== "Admin"  && <span><strong>In Stock: </strong>{this.state.inventory}<br/></span> }
              <strong>Model Number: </strong>{this.props.product.selectedProduct.modelNumber}<br/>
              <strong>Identifier: </strong>{this.props.product.selectedProduct.id}<br/>
            </DialogContentText>
            { this.state.showInventory &&
              <span>
                <hr/>
                <DialogContentText>
                  <strong>Current Inventory Count: </strong>{this.state.inventory}<br/>
                  { !this.props.product.isFetchingInventory &&
                    <span>
                      <IconButton  onClick={this.removeInventory}><RemoveCircleOutline/></IconButton>
                      <IconButton  onClick={this.addInventory}><AddCircleOutline/></IconButton>
                    </span>
                  }
                  { this.props.product.isFetchingInventory &&
                    <span>
                      <IconButton  disabled><RemoveCircleOutline/></IconButton>
                      <IconButton  disabled><AddCircleOutline/></IconButton>
                    </span>
                  }
                </DialogContentText>
              </span>
            }
          </DialogContent>
          <DialogActions>
            { this.props.authentication.userType === "Admin" &&
              <span>
                <Button onClick={ () => this.toggleInventoryView() } color='primary'>
                    { this.state.showInventory ? "Hide Inventory" : "Show Inventory" }
                </Button>
                <Button onClick={ () => this.props.showModifyProduct(this.props.product.selectedProduct) } color='primary'>
                  Modify
                </Button>
              </span>
            }
            { this.props.authentication.userType === "Client" &&
              ( this.props.product.inventoryCount > 0 ?
                <Button onClick={ () => this.props.addToCart(this.props.product.selectedProduct.id) } color='primary'>
                  Add to Cart
                </Button>
                :
                <Button disabled color='primary'>
                  Add to Cart
                </Button>
              )
            }
            <Button disabled={ previousDisabled } onClick={ () => this.props.previousProduct() } color='primary'>
              Previous
            </Button>
            <Button disabled={ nextDisabled } onClick={ () => this.props.nextProduct() } color='primary'>
              Next
            </Button>
            <Button onClick={this.props.handleRequestClose} color="default">
              Back
            </Button>
          </DialogActions>
        </Dialog>
		  )
	}

};

const mapStateToProps = ({ product, authentication }) => ({
  	product,
    authentication
});

const mapDispatchToProps = {
  showModifyProduct,
  addToInventory,
  removeFromInventory,
  addToCart,
  fetchInventory,
  previousProduct,
  nextProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDialog);