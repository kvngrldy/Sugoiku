import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, TextInput } from 'react-native'
import {  Button } from 'native-base';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux'
import { getBoardAsync, isSolved } from '../store/actions/boardActions'

export default function GameBoard({ difficulty }) {


    const [newBoard, setNewBoard] = useState([])
    const initialBoard = useSelector(state => state.board)
    const solved = useSelector(state => state.isSolved)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('unsolved')

    useEffect(() => {
        dispatch(getBoardAsync(difficulty))

    }, [])




    useEffect(() => {

        console.log(solved, `dariboardatas`)
        dispatch(isSolved(false))
        setNewBoard(initialBoard)

        console.log(solved, `dariboardbwh`)
    }, [initialBoard])

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const solveBoard = () => {
        const data = {
            board: initialBoard
        }
        console.log('solveeee')
        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then((response) => {
                setNewBoard(response.solution)
            })
            .catch(console.log)
    }

    const validateBoard = () => {
        const data = {
            board: newBoard
        }
        fetch("https://sugoku.herokuapp.com/validate", {
            method: "POST",
            body: encodeParams(data),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
            .then((response) => response.json())
            .then((response) => {
                
                if (response.status == 'solved') {
                    dispatch(isSolved(true))
                    setMessage(response.status)
                } else {
                    dispatch(isSolved(false))
                }
            })
            .catch(console.log);
    };




    const boardHandler = (text, line, column) => {
        let boardClone = JSON.parse(JSON.stringify(newBoard))
        boardClone[line].splice(column, 1, Number(text))
        setNewBoard(boardClone)
    }

    return (
        <View style={styles.board}>
            {newBoard.map((line, row) => (
                <View style={row == 2 || row == 5 ? styles.rowMargin : styles.rowDefault} key={row}>
                    {line.map((box, column) => (
                        <View style={column == 2 || column == 5 ? styles.columnMargin : styles.columnDefault} key={column}>
                            {initialBoard[row][column] === 0 ? <TextInput maxLength={1} keyboardType={'numeric'} onChangeText={(text) => boardHandler(text, row, column)} style={styles.boxInput} value={box > 0 ? String(box) : ""}>
                            </TextInput> : <Text style={styles.boxDefault}>
                                    {box}
                                </Text>}
                        </View>
                    ))}
                </View>
            ))}
            <View style={styles.btnstyle}>
                <Button onPress={() => solveBoard()} large bordered iconLeft>
                <AntDesign name="rocket1" size={30} color="black" />
                    <Text  style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}>Auto Solve</Text>
                </Button>

                <Button onPress={() => validateBoard()} large bordered iconLeft>
                <MaterialCommunityIcons name="hand-okay" size={24} color="black" />
                    <Text  style={{ margin: 10, fontSize: 16, fontWeight: 'bold' }}>Validate</Text>
                </Button>
                
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{message.toUpperCase()}</Text>
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnstyle: {
        flex: 1,
        width: 400,
        flexDirection: 'row',
        marginVertical:30,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    boxInput: {
        width: 42,
        height: 42,
        borderWidth: 0.3,
        borderRadius: 7,
        // elevation: 90,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: '#f9f8eb',
        fontSize: 27,
        color: '#fd5f00',
        fontWeight: 'bold'
    },

    boxDefault: {
        width: 42,
        height: 42,
        elevation: 20,
        textAlign: "center",
        borderRadius: 7,
        textAlignVertical: "center",
        backgroundColor: '#f9f8eb',
        fontWeight: 'bold',
        fontSize: 27,
        borderWidth: 0.3,
        color: '#05004e',

    },

    rowDefault: {
        flexDirection: 'row',
    },

    rowMargin: {
        flexDirection: 'row',
        marginBottom: 6
    },

    columnDefault: {
        margin: 1,

    },

    columnMargin: {
        marginRight: 6
    }


})
