
const NOTIFICATION_LOAD = 'NOTIFICATION_LOAD'
const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR'

const SUCCESS = 'success'
const ERROR = 'error'
const LOADING = 'loading'

const showNotification = (message, type = LOADING) => dispatch => {
    if(type === LOADING){
        dispatch({ type: NOTIFICATION_LOAD, payload: { class: 'alert-loading', message: message} })
    }
    else if(type === SUCCESS){
        dispatch({ type: NOTIFICATION_SUCCESS, payload: { class: 'alert-success', message: message } })
    }
    else if(type === ERROR){
        dispatch({ type: NOTIFICATION_ERROR, payload: { class: 'alert-error', message: message } })
    }
}

export const showLoadingNotification = message => showNotification(message)
export const showSuccessNotification = message => showNotification(message, SUCCESS)
export const showErrorNotification = message => showNotification(message, ERROR)


const initialState = {
    class: 'alert-loading',
    message: 'loading text'
}

export default function Notification(state = initialState, { type, payload }) {
    switch (type) {
        case NOTIFICATION_LOAD:
            return { ...state, class: payload.class, message: payload.message }
        case NOTIFICATION_SUCCESS:
            return { ...state, class: payload.class, message: payload.message }
        case NOTIFICATION_ERROR:
            return { ...state, class: payload.class, message: payload.message }
        default: return state
    }
}