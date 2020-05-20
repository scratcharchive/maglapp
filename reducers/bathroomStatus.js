import { SET_BATHROOM_PROPERTY, ADD_BATHROOM, DELETE_BATHROOM } from '../actions'

/*
[
    {
        "name": "downstairs",
        "clogged": true,
        "needsToiletPaper": false,
        "needsCleaning": false
    },
    {
        "name": "upstairs-hall",
        "clogged": true,
        "needsToiletPaper": false,
        "needsCleaning": false
    }
]
*/

const bathroomStatus = (state = {}, action) => {
    switch (action.type) {
        case ADD_BATHROOM:
            // TODO: check that this is not a duplicate
            return [
                ...state,
                {
                    name: action.bathroomName
                }
            ]
        case DELETE_BATHROOM:
            // TODO: check that this is not a duplicate
            return state.filter(br => (br.name !== action.bathroomName));
        case SET_BATHROOM_PROPERTY:
            let newState = [];
            for (let br of state) {
                if (br.name === action.bathroomName) {
                    let br2 = {...br};
                    br2[action.key] = action.value;
                }
                else {
                    newState.push(br);
                }
            }
            return newState;
        default:
            return state
    }
}

export default bathroomStatus