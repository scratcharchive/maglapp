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

function findGroceryItem(state, name) {
    return state.filter(item => (item.name === name))[0];
}

export default generalSettings