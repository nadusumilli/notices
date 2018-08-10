
const NOTIFICATION_LOAD = 'NOTIFICATION_LOAD'
const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'

const SUCCESS = 'success'
const ERROR = 'error'
const LOADING = 'loading'

const showNotification = (message, type = LOADING) => dispatch => {
    if(type === LOADING){
        dispatch({ type: NOTIFICATION_LOAD, payload: message })
    }
    else if(type === SUCCESS){
        dispatch({ type: NOTIFICATION_SUCCESS, payload: message })
    }
    else if(type === ERROR){
        dispatch({ type: NOTIFICATION_ERROR, payload: message })
    }
}

export const showLoadingNotification = message => showNotification(message)
export const showSuccessNotification = message => showNotification(message, SUCCESS)
export const showErrorNotification = message => showNotification(message, ERROR)


const initialState = {
    status: 'alert-loading',
    message: 'loading text'
}

export default function Notification(state = initialState, { type, payload }) {
    switch (type) {
        case NOTIFICATION_LOAD:
            return { ...state, status: 'alert-loading', message: payload }
        case NOTIFICATION_SUCCESS:
            return { ...state, status: 'alert-success', message: payload }
        case NOTIFICATION_ERROR:
            return { ...state, status: 'alert-error', message: payload }
        default: return state
    }
}