import { SET_GENERAL_SETTING } from '../actions'

const generalSettings = (state = {}, action) => {
    switch (action.type) {
        case SET_GENERAL_SETTING:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state
    }
}

export default generalSettings