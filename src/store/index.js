import { combineReducers } from 'redux';

import textTransform from './textTransform'
import notification from './notification'

export default combineReducers({
    textTransform,
    notification
})