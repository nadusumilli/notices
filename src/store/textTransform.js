import axios from 'axios'
import { showLoadingNotification, showSuccessNotification, showErrorNotification } from './notification'

const TRANSFORM_VALUE_LOAD = 'TRANSFORM_VALUE_LOAD'
const TRANSFORM_VALUE_SUCCESS = 'TRANSFORM_VALUE_SUCCESS'
const TRANSFORM_VALUE_ERROR = 'TRANSFORM_VALUE_ERROR'

const LOWERCASE_ENDPOINT = '/api/lowercase'
const UPPERCASE_ENDPOINT = '/api/uppercase'

const UPPERCASE = 'uppercase'
const LOWERCASE = 'lowercase'

const transformText = (input, mode = LOWERCASE) => dispatch => {
    // Declaring the messages for the notification.
    const successMessage = mode === LOWERCASE ? 'Successfully loaded lowercase.' : 'Successfully loaded uppercase';
    const errorMessage = mode === LOWERCASE ? 'Error loaded lowercase.' : 'Error loaded uppercase';
    const loadingMessage = mode === LOWERCASE ? 'Loading lowercase.' : 'Loading uppercase';
    
    mode = mode.toLowerCase()
    const endpoint = mode === UPPERCASE ? UPPERCASE_ENDPOINT : LOWERCASE_ENDPOINT

    // Sending the loading notification.
    dispatch(showLoadingNotification(loadingMessage));
    dispatch({ type: TRANSFORM_VALUE_LOAD})
    axios.post(endpoint, { input })
        .then(res => {
                        // Sending the success notification.
                        dispatch(showSuccessNotification(successMessage));
                        dispatch({ type: TRANSFORM_VALUE_SUCCESS, payload: res.data})
                    })
        .catch(err => {
                        // Sending the error notification.
                        dispatch(showErrorNotification(errorMessage));
                        dispatch({ type: TRANSFORM_VALUE_ERROR, payload: err})
                    })
}

export const transformToLowerCase = input => transformText(input)
export const transformToUpperCase = input => transformText(input, UPPERCASE)

const initialState = {
    transformedValue: '',
    isLoading: false,
    isSuccess: false,
    error: null
}

export default function textTransform(state = initialState, { type, payload}) {
    switch (type) {
        case TRANSFORM_VALUE_LOAD:
            return { ...state, isLoading: true, transformedValue: '' }
        case TRANSFORM_VALUE_SUCCESS:
            return { ...state, isLoading: false,transformedValue: payload.output }
        case TRANSFORM_VALUE_ERROR:
            return { ...state, isLoading: false, error: payload.message }
        default: return state
    }
}