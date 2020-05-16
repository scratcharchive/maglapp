import { ADD_CHAT_ITEM, DELETE_CHAT_ITEM } from '../actions'

const chatItems = (state = [], action) => {
    let item0;
    switch (action.type) {
        case ADD_CHAT_ITEM:
            return [
                ...state,
                action.item
            ];
        case DELETE_CHAT_ITEM:
            item0 = findChatItem(state, action.name);
            if (!item0) return state;
            return state.filter(item => (item.id !== action.id));
        default:
            return state
    }
}

function findChatItem(state, id) {
    return state.filter(item => (item.id === id))[0];
}

export default chatItems