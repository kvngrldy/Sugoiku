import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const Option = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{margin:30}}>Option</Text>
            <Button
                title="Go!"
                onPress={() => navigation.navigate('Game')}
            />
            <Button
                title="Easy"
                onPress={() => navigation.navigate('Game', {
                    difficulty: 'easy'
                })}
            />
            <Button
                title="Medium"
                onPress={() => navigation.navigate('Game', {
                    difficulty: 'medium'
                })}
            />
            <Button
                title="Hard"
                onPress={() => navigation.navigate('Game', {
                    difficulty: 'hard'
                })}
            />
        </View>
    )
}

export default Option

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})