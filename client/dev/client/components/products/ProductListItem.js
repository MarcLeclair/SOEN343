import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/DeleteForever';
import DetailsIcon from 'material-ui-icons/InfoOutline';
import AssignmentReturnIcon from 'material-ui-icons/AssignmentReturn';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import { TableCell, TableRow } from 'material-ui/Table';

class ProductListItem extends Component{

  state = {
    deleteToolTipOpen: false,
    detailToolTipOpen: false
  };

  handleIconButtonRequestClose = () => {
    this.setState({ deleteToolTipOpen: false });
  };

  handleIconButtonRequestOpen = () => {
    this.setState({ deleteToolTipOpen: true });
  };

  handleDetailButtonRequestClose = () => {
    this.setState({ detailToolTipOpen: false });
  };

  handleDetailButtonRequestOpen = () => {
    this.setState({ detailToolTipOpen: true });
  };
  
  render() {
    const {userType, onClick, onAdd, brand, price, onDelete, deleteLabel, pageType, electronicType, modelNumber, returnDate } = this.props;

    return (
    	<TableRow>
        <TableCell>{modelNumber}</TableCell>
        <TableCell>{electronicType}</TableCell>
        <TableCell>{brand}</TableCell>
        <TableCell numeric>{`$${price}`}</TableCell>
        <TableCell numeric>
          <Tooltip
            id="tooltip-controlled"
            title="View Details"
            onRequestClose={this.handleDetailButtonRequestClose}
            enterDelay={300}
            leaveDelay={100}
            onRequestOpen={this.handleDetailButtonRequestOpen}
            open={this.state.detailToolTipOpen}
            placement="top"
          >
        	  <IconButton onClick={onClick} color='primary'> <DetailsIcon /></IconButton>
          </Tooltip>
          { (userType === "Admin" || pageType === "history") &&
            <Tooltip
              id="tooltip-controlled"
              title={(returnDate != null || onDelete == null)?"Already Refunded":deleteLabel}
              onRequestClose={this.handleIconButtonRequestClose}
              enterDelay={300}
              leaveDelay={100}
              onRequestOpen={this.handleIconButtonRequestOpen}
              open={this.state.deleteToolTipOpen}
              placement="top"
            >
              <div style={{ 'display': 'inline-block' }}>
                <IconButton disabled={returnDate != null || onDelete == null} onClick={onDelete} color='accent'> 
                  { pageType == "history" ? (
                      <AssignmentReturnIcon />
                    ) : (
                      <DeleteIcon /> 
                  )}
                </IconButton>
              </div>
            </Tooltip>
          }
        </TableCell>
      </TableRow>
    )
  }

};

ProductListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteLabel: PropTypes.string.isRequired,
  pageType: PropTypes.string,
  returnDate: PropTypes.string
};

export default ProductListItem;