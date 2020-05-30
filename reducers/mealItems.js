import { ADD_MEAL_ITEM, DELETE_MEAL_ITEM, SET_MEAL_ITEM_PROPERTY } from '../actions'

const mealItems = (state = [], action) => {
    let item0;
    switch (action.type) {
        case ADD_MEAL_ITEM:
            item0 = findMealItem(state, action.item.id);
            if (item0) return state;
            return [
                ...state,
                action.item
            ];
        case DELETE_MEAL_ITEM:
            item0 = findMealItem(state, action.id);
            if (!item0) return state;
            return state.filter(item => (item.id !== action.id));
        case SET_MEAL_ITEM_PROPERTY:
            item0 = findMealItem(state, action.id);
            if (!item0) return state;
            return [
                ...state.filter(item => (item.id !== action.id)),
                {
                    ...item0,
                    [action.key]: action.value
                }
            ]
        default:
            return state
    }
}

function findMealItem(state, id) {
    return state.filter(item => (item.id === id))[0];
}

export default mealItems