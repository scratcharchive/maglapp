import { combineReducers } from 'redux'
import groceryItems from './groceryItems'
import chatItems from './chatItems'
import generalSettings from './generalSettings'
import personalSettings from './personalSettings'
import bathroomStatus from './bathroomStatus'

export default combineReducers({
    groceryItems,
    chatItems,
    generalSettings,
    personalSettings,
    bathroomStatus
})