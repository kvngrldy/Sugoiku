import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import boardReducers from './reducers/boardReducers'

const store = createStore(boardReducers, applyMiddleware(thunk))

export default store