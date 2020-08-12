import {GET_BOARD, IS_SOLVED} from '../actions/types'

const initialState = {
    board: [],
    isSolved: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_BOARD:
            return {
                ...state,
                board: action.payload
            }
        case IS_SOLVED:
            return {
                ...state, 
                isSolved: action.payload
            }
        default: 
        return state
    }
}