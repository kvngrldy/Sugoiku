import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameBoard from '../components/GameBoard'
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'

export default function Game({ navigation, route }) {
    const { difficulty } = route.params

    return (
        <View style={styles.game}>
            <LinearGradient
                colors={['#448AFF', '#9E9E9E', '#FFEB3B', '#FF5722']}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <Button
                        title="Test Button"
                        onPress={() => navigation.navigate('End')}
                    />

                    <Text style={{ fontWeight: 'bold', fontSize: 28 }}>SUDOKU</Text>
                    <StatusBar style="auto" />
                </View>
            </LinearGradient>
            <View style={styles.board}>
                <GameBoard difficulty={difficulty}></GameBoard>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: 'gray',
        alignContent: "center",
        justifyContent: 'center',
        alignItems: 'center',

    },
    board: {
        flex: 3,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    game: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center'
    }
});