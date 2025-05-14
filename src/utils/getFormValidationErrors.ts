import axios from "axios";

export function getFormValidationErrors(error: unknown) {
    if(axios.isAxiosError(error) && error.status === 400 && error.response?.data) {
        return {
            validationErrors: error.response?.data.errors,
            validationErrorMessage: error.response?.data.message
        }
    } 

    return {
        validationErrors: null,
        validationErrorMessage: null
    };

}