import { GET_BOARD, IS_SOLVED } from './types'
import axios from 'axios'

export const getBoard = (arr) => {
    return ({
        type: GET_BOARD,
        payload: arr
    })
}

export const isSolved = (status) => {
    return ({
        type: IS_SOLVED,
        payload: status
    })
}

export const getBoardAsync = (difficulty) => {
    return(dispatch) => {
        axios({
            method: 'get',
            url: `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
        })
        .then(({data}) => {
            
            dispatch(getBoard(data.board))
            
        })
        .catch(console.log)
    }
}