import { combineReducers } from 'redux'
import groceryItems from './groceryItems'
import generalSettings from './generalSettings'

export default combineReducers({
    groceryItems,
    generalSettings
})