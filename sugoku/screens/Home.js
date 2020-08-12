import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{margin:30, fontWeight:'bold'}}>Home</Text>
            <Button
                title="Let's Play!"
                onPress={() => navigation.navigate('Option')}
            />
            <Button
                title="How To Play"
                onPress={() => navigation.navigate('HowToPlay')}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})