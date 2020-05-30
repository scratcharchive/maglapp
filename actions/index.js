export const ADD_GROCERY_ITEM = 'ADD_GROCERY_ITEM'
export const DELETE_GROCERY_ITEM = 'DELETE_GROCERY_ITEM'
export const SET_GROCERY_ITEM_PROPERTY = 'SET_GROCERY_ITEM_PROPERTY'

export const ADD_MEAL_ITEM = 'ADD_MEAL_ITEM'
export const DELETE_MEAL_ITEM = 'DELETE_MEAL_ITEM'
export const SET_MEAL_ITEM_PROPERTY = 'SET_MEAL_ITEM_PROPERTY'

export const SET_GENERAL_SETTING = 'SET_GENERAL_SETTING'
export const SET_PERSONAL_SETTING = 'SET_PERSONAL_SETTING'

export const ADD_CHAT_ITEM = 'ADD_CHAT_ITEM'
export const DELETE_CHAT_ITEM = 'DELETE_CHAT_ITEM'

export const ADD_BATHROOM = 'ADD_BATHROOM'
export const DELETE_BATHROOM = 'DELETE_BATHROOM'
export const SET_BATHROOM_PROPERTY = 'SET_BATHROOM_PROPERTY'

// Groceries
export const addGroceryItem = item => ({
    type: ADD_GROCERY_ITEM,
    item,
    persistKey: 'groceryItems'
})

export const deleteGroceryItem = name => ({
    type: DELETE_GROCERY_ITEM,
    name,
    persistKey: 'groceryItems'
})

export const setGroceryItemProperty = (name, key, value) => ({
    type: SET_GROCERY_ITEM_PROPERTY,
    name,
    key,
    value,
    persistKey: 'groceryItems'
})

// Meals
export const addMealItem = item => ({
    type: ADD_MEAL_ITEM,
    item,
    persistKey: 'mealItems'
})

export const deleteMealItem = id => ({
    type: DELETE_MEAL_ITEM,
    id,
    persistKey: 'mealItems'
})

export const setMealItemProperty = (id, key, value) => ({
    type: SET_GROCERY_ITEM_PROPERTY,
    id,
    key,
    value,
    persistKey: 'groceryItems'
})

// Settings
export const setGeneralSetting = (key, value) => ({
    type: SET_GENERAL_SETTING,
    key,
    value,
    persistKey: 'generalSettings'
})

export const setPersonalSetting = (key, value) => ({
    type: SET_PERSONAL_SETTING,
    key,
    value
})

// Chat
export const addChatItem = item => ({
    type: ADD_CHAT_ITEM,
    item,
    persistKey: 'chatItems'
})

export const deleteChatItem = id => ({
    type: DELETE_CHAT_ITEM,
    id,
    persistKey: 'chatItems'
})

// Bathroom status
export const addBathroom = (bathroomName) => ({
    type: ADD_BATHROOM,
    bathroomName,
    persistKey: 'bathroomStatus'
})

export const deleteBathroom = (bathroomName) => ({
    type: DELETE_BATHROOM,
    bathroomName,
    persistKey: 'bathroomStatus'
})

export const setBathroomProperty = (bathroomName, key, value) => ({
    type: SET_BATHROOM_PROPERTY,
    bathroomName,
    key, // clogged, needsToiletPaper
    value,
    persistKey: 'bathroomStatus'
})
