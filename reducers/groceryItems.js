import { ADD_GROCERY_ITEM, DELETE_GROCERY_ITEM, SET_GROCERY_ITEM_PROPERTY } from '../actions'

const groceryItems = (state = [], action) => {
    let item0;
    switch (action.type) {
        case ADD_GROCERY_ITEM:
            item0 = findGroceryItem(state, action.item.name);
            if (item0) return state;
            return [
                ...state,
                action.item
            ];
        case DELETE_GROCERY_ITEM:
            item0 = findGroceryItem(state, action.name);
            if (!item0) return state;
            return state.filter(item => (item.name !== action.name));
        case SET_GROCERY_ITEM_PROPERTY:
            item0 = findGroceryItem(state, action.name);
            if (!item0) return state;
            return [
                ...state.filter(item => (item.name !== action.name)),
                {
                    ...item0,
                    [action.key]: action.value
                }
            ]
        default:
            return state
    }
}

function findGroceryItem(state, name) {
    return state.filter(item => (item.name === name))[0];
}

export default groceryItems