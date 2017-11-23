import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import { attemptRegistration } from '../../actions/registration';
import { hideSnackbar } from '../../actions/index';

const formStyle = {
    display: 'flex',
    flexWrap: 'wrap'
};

class Registration extends Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            address: "",
            phone: "",
            tester: false,
            fname_error: false,
            lname_error: false,
            email_error: false,
            password_error: false,
            address_error: false,
            phone_error: false
        };

        this.register = () => {
            return this.props.attemptRegistration({
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phone: this.state.phone
            });
        };

        this.syncStateToInputValue = (field, event) => {
            this.setState({...this.state, [field]: event.target.value});
        }

        this.validate = () => {
            this.resetErrors();

            if (this.state.fname === "" || this.state.lname === "" || this.state.email === "" || this.state.password === "" || this.state.address === "" || this.state.phone === "") {
                this.state.fname === "" ? this.setState({ fname_error: true }) : this.setState({ fname_error: false });
                this.state.lname === "" ? this.setState({ lname_error: true }) : this.setState({ lname_error: false });
                this.state.email === "" ? this.setState({ email_error: true }) : this.setState({ email_error: false });
                this.state.password === "" ? this.setState({ password_error: true }) : this.setState({ password_error: false });
                this.state.address === "" ? this.setState({ address_error: true }) : this.setState({ address_error: false });
                this.state.phone === "" ? this.setState({ phone_error: true }) :  this.setState({ phone_error: false });
            } else {
                this.register().then(
                    res => {
                        if (!res.error) {
                            this.resetForm();
                        }
                    },
                    error => console.log('error in calling register')
                );
            }
        };

        this.resetForm = () => {
            this.setState({ fname: "" });
            this.setState({ lname: "" });
            this.setState({ email: "" });
            this.setState({ password: "" });
            this.setState({ address: "" });
            this.setState({ phone: "" });
            this.resetErrors();
        }

        this.resetErrors = () => {
            this.setState({ fname_error: false });
            this.setState({ lname_error: false });
            this.setState({ email_error: false });
            this.setState({ password_error: false });
            this.setState({ address_error: false });
            this.setState({ phone_error: false });
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.props.handleRequestClose}>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create an account to see our selection of electronic items!
                    </DialogContentText>
                    <form style={formStyle} noValidate autoComplete="off">
                        <Grid container spacing={24} justify='center'>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="fname"
                                    label="First Name"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.fname_error ? "Required" : ""}
                                    error={this.state.fname_error}
                                    onChange={(event) => this.syncStateToInputValue("fname", event)}
                                    value={this.state.fname}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="lname"
                                    label="Last Name"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.lname_error ? "Required" : ""}
                                    error={this.state.lname_error}
                                    onChange={(event) => this.syncStateToInputValue("lname", event)}
                                    value={this.state.lname}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24} justify='center'>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="email"
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.email_error ? "Required" : ""}
                                    error={this.state.email_error}
                                    onChange={(event) => this.syncStateToInputValue("email", event)}
                                    value={this.state.email}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="password"
                                    type="password"
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.password_error ? "Required" : ""}
                                    error={this.state.password_error}
                                    onChange={(event) => this.syncStateToInputValue("password", event)}
                                    value={this.state.password}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24} justify='center'>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.address_error ? "Required" : ""}
                                    error={this.state.address_error}
                                    onChange={(event) => this.syncStateToInputValue("address", event)}
                                    value={this.state.address}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    style={{ maxWidth: "20rem" }}
                                    id="phone"
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    helperText={this.state.phone_error ? "Required" : ""}
                                    error={this.state.phone_error}
                                    onChange={(event) => this.syncStateToInputValue("phone", event)}
                                    value={this.state.phone}
                                />
                            </Grid>
                        </Grid>
                    </form>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={this.validate}>
                    Register
                </Button>
                <Button color="default" onClick={this.props.handleRequestClose}>
                    Back
                </Button>
            </DialogActions>
        </Dialog>
        );
    }
}

const mapStateToProps = ({ registration, snackbar }) => ({
    registration,
    snackbar
});

const mapDispatchToProps = {
    attemptRegistration,
    hideSnackbar
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);