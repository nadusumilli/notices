import axios from 'axios'

const TRANSFORM_VALUE_LOAD = 'TRANSFORM_VALUE_LOAD'
const TRANSFORM_VALUE_SUCCESS = 'TRANSFORM_VALUE_SUCCESS'
const TRANSFORM_VALUE_ERROR = 'TRANSFORM_VALUE_ERROR'

const LOWERCASE_ENDPOINT = '/api/lowercase'
const UPPERCASE_ENDPOINT = '/api/uppercase'

const UPPERCASE = 'uppercase'
const LOWERCASE = 'lowercase'

const transformText = (input, mode = LOWERCASE) => dispatch => {
    mode = mode.toLowerCase()
    const endpoint = mode === UPPERCASE ? UPPERCASE_ENDPOINT : LOWERCASE_ENDPOINT

    dispatch({ type: TRANSFORM_VALUE_LOAD })
    axios.post(endpoint, { input })
        .then(res => dispatch({ type: TRANSFORM_VALUE_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: TRANSFORM_VALUE_ERROR, payload: err }))
}

export const transformToLowerCase = input => transformText(input)
export const transformToUpperCase = input => transformText(input, UPPERCASE)

const initialState = {
    transformedValue: '',
    isLoading: false,
    isSuccess: false,
    error: null
}

export default function textTransform(state = initialState, { type, payload }) {
    switch (type) {
        case TRANSFORM_VALUE_LOAD:
            return { ...state, isLoading: true, isSuccess: false, transformedValue: '' }
        case TRANSFORM_VALUE_SUCCESS:
            return { ...state, isLoading: false, isSuccess: true,transformedValue: payload.output }
        case TRANSFORM_VALUE_ERROR:
            return { ...state, isLoading: false, isSuccess: false, error: payload.message }
        default: return state
    }
}