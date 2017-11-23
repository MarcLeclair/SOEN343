import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';

import { setProductFilter, getProducts, setPage } from '../../actions/productView';

const eTypes = [
    'Monitor',
    'Desktop',
    'Laptop',
    'Tablet'
];

class ProductTypeDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brand: this.props.product.filters.brand,
            electronicType: this.props.product.filters.electronicType,
            priceLow: this.props.product.filters.priceLow,
            priceHigh: this.props.product.filters.priceHigh,
            maxSize: this.props.product.filters.maxSize,
            maxWeight: this.props.product.filters.maxWeight,
        }
        this.syncStateToInputValue = this.syncStateToInputValue.bind(this);
    }

    syncStateToInputValue = (field, event) => {
        this.props.setPage(1);
        let filter;
        this.setState({[field]: event.target.value}, () => {
            filter = this.state;
            this.props.setProductFilter(filter);
            this.props.getProducts();
        });
    };

    render() {
        return (
            <div>
                <Grid alignItems="flex-end" container spacing={24} justify='center'>
                    <Grid item xs={2}>
                        <Select name="electronicType"
                                value={this.state.electronicType}
                                onChange={(event) => this.syncStateToInputValue("electronicType", event)}
                                style={{marginLeft: '1rem'}}
                        >
                            <MenuItem value="Type">Types</MenuItem>
                            {eTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <Select name="brand"
                                value={this.state.brand}
                                onChange={(event) => this.syncStateToInputValue("brand", event)}
                        >
                            <MenuItem value="Brand">Brands</MenuItem>
                            { this.props.product.brands.length > 0 &&
                            this.props.product.brands.map((brand, index) => (
                                <MenuItem key={index} value={brand}>
                                    {brand}
                                </MenuItem>
                            ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceLow"
                            name="priceLow"
                            label="Min Price"
                            type="number"
                            onChange={(event) => this.syncStateToInputValue("priceLow", event)}
                            value={this.state.priceLow}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="priceHigh"
                            name="priceHigh"
                            label="Max Price"
                            type="number"
                            onChange={(event) => this.syncStateToInputValue("priceHigh", event)}
                            value={this.state.priceHigh}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="maxWeight"
                            name="maxWeight"
                            label="Max Weight"
                            type="number"
                            min={0}
                            onChange={(event) => this.syncStateToInputValue("maxWeight", event)}
                            value={this.state.maxWeight}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        {this.state.electronicType === "Desktop" ? null :
                            <TextField
                                id="maxSize"
                                name="maxSize"
                                label="Max Size"
                                type="number"
                                onChange={(event) => this.syncStateToInputValue("maxSize", event)}
                                value={this.state.maxSize}
                            />
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({product}) => ({
    product
});

const mapDispatchToProps = (dispatch) => {
    return {
        setProductFilter: (filter) => {
            dispatch(setProductFilter(filter));
        },
        getProducts: () => {
            dispatch(getProducts());
        },
        setPage: (number) => {
            dispatch(setPage(number));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTypeDropdown);