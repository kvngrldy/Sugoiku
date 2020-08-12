
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import GameBoard from '../components/GameBoard'
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Game({ navigation, route }) {
    const { difficulty, username } = route.params
    const isSolved = useSelector(state => state.isSolved)
    const board = useSelector(state => state.board)
    const [mins, setMins] = useState(0)
    const [secs, setSecs] = useState(5)
    const txt = difficulty.toUpperCase()
    useEffect(() => {

        if (isSolved === false) {
            const timerId = setInterval(() => {
                if (secs <= 0) {
                    if (mins <= 0) {
                        navigation.navigate('EndLose', {
                            username
                        })
                    }
                    else {
                        setMins(m => m - 1)
                        setSecs(59)
                    }
                }
                else setSecs(s => s - 1)
            }, 1000)
            return () => clearInterval(timerId);
        }

    }, [secs, mins, isSolved])


    return (


        <View style={styles.game}>
            <View style={styles.header}>
                
    <Text style={{fontSize: 28 }}>{txt}</Text>
    <Text style={{ fontSize: 40 }}>
                    {mins}:{secs < 10 && 0}{secs}
                </Text>
            </View>
            <View style={styles.board}>
                <GameBoard difficulty={difficulty} ></GameBoard>
            </View>
            <View>
                {isSolved && <Button
                    title="Submit Board"
                    onPress={() => navigation.navigate('End', {
                        username: username
                    })}
                />}
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        
        alignContent: "center",
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginHorizontal: 10
    },
    board: {
        flex: 5,
        elevation: 50,
        
        justifyContent: 'flex-start',
        alignItems: 'center',
        
        
    },
    game: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    }
});