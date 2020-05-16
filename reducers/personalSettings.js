import { SET_PERSONAL_SETTING } from '../actions'

const personalSettings = (state = {}, action) => {
    switch (action.type) {
        case SET_PERSONAL_SETTING:
            return {
                ...state,
                [action.key]: action.value
            }
        default:
            return state
    }
}

export default personalSettings