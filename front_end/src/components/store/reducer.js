// Application Level Reducer 
// import { TEST_ACTION } from "./action-types"; 

import { GET_TABLE_DATA } from "./action-types";

// Initial Application state 
const initialState = {
    tableData: []
}
// Reducer to change state based on the action 
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TABLE_DATA:
            return Object.assign({}, state, { tableData: action.payload });
            break;
        default:
            return state;
    }
}
export default appReducer; 
