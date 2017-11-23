import * as actions from './action-types';
import callApi from '../utils/apiCaller';
import { customSnackbar } from './index';

export const attemptRegistration = (credentials) => {
    return (dispatch) => {
        return callApi('api/users', 'post', {
            fname: credentials.fname,
            lname: credentials.lname,
            email: credentials.email,
            password: credentials.password,
            address: credentials.address,
            phone: credentials.phone,
        }).then(
            res => {
                if (!res.error) {
                    dispatch(receiveAttemptRegistration(res));
                } else {
                    let message = 'Error in one or more input fields.';

                    if (res.error && res.error.message) {
                        message = res.error.message;
                    }

                    dispatch(customSnackbar(message));
                }

                return res;
            },
            error => {
                dispatch(receiveAttemptRegistration({ data: undefined }));
                dispatch(customSnackbar('There was an error in registering, try again.'));
                return res;
            }
        );
    }
}

export const receiveAttemptRegistration = (result) => {
    if (result.data !== undefined) {
        return {
            type: actions.ACCEPT_REGISTRATION,
        };
    } else {
        return {
            type: actions.REJECT_REGISTRATION
        };
    }
}