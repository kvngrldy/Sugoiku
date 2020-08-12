import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import { color } from 'react-native-reanimated';
import axios from 'axios'
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { getBoardAsync, isSolved } from '../store/actions/boardActions'

export default function GameBoard({ difficulty }) {


    const [newBoard, setNewBoard] = useState([])
    const initialBoard = useSelector(state => state.board)

    const solved = useSelector(state => state.isSolved)
    //const solvingBoard = {board: initialBoard}
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getBoardAsync(difficulty))
        console.log(`status initial`, solved)
    }, [])


    useEffect(() => {
        console.log(`status`, solved)
    }, [solved])

    useEffect(() => {
        setNewBoard(initialBoard)
        dispatch(isSolved(false))
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

        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then((response) => {
                dispatch(isSolved(true))
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
                console.log(response.status)
            })
            .catch(console.warn);
    };




    const boardHandler = (text, line, column) => {

        let boardClone = JSON.parse(JSON.stringify(newBoard))
        //console.log(newBoard, `<><><><>`)
        boardClone[line].splice(column, 1, Number(text))

        setNewBoard(boardClone)
    }

    return (
        <View style={styles.board}>
            <Button title="Solve Button" onPress={() => solveBoard()} />
            <Button title="Validate" onPress={() => validateBoard()} />
            {solved == false ? initialBoard.map((line, row) => (
                <View style={row == 2 || row == 5 ? styles.rowMargin : styles.rowDefault} key={row}>
                    {line.map((box, column) => (
                        <View style={column == 2 || column == 5 ? styles.columnMargin : styles.columnDefault} key={column}>
                            {box === 0 ? <TextInput maxLength={1} keyboardType={'numeric'} onChangeText={(text) => boardHandler(text, row, column)} style={styles.boxInput}>
                            </TextInput> : <Text style={styles.boxDefault}>
                                    {box}
                                </Text>}
                        </View>
                    ))}
                </View>
            )) : newBoard.map((line, row) => (
                <View style={row == 2 || row == 5 ? styles.rowMargin : styles.rowDefault} key={row}>
                    {line.map((box, column) => (
                        <View style={column == 2 || column == 5 ? styles.columnMargin : styles.columnDefault} key={column}>
                            {box === 0 ? <TextInput onChangeText={(text) => boardHandler(text, row, column)} style={styles.boxInput}>
                            </TextInput> : <Text style={styles.boxDefault}>
                                    {box}
                                </Text>}
                        </View>
                    ))}
                </View>
            ))}
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxInput: {
        width: 42,
        height: 42,
        borderWidth: 0.3,
        borderRadius: 7,
       // elevation: 90,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: '#F8F8F8',
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold'
    },

    boxDefault: {
        width: 42,
        height: 42,
        elevation: 20,
        textAlign: "center",
        borderRadius: 7,
        textAlignVertical: "center",
        backgroundColor: '#F8F8F8',
        fontWeight: 'bold',
        fontSize: 18,
        borderWidth: 0.3,
        color: 'grey',

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
