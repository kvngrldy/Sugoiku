import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import {  Button } from 'native-base';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            
            
            <Image
        source={require('../assets/SUGOIKU.png')}
      />
      <Button style={{alignSelf: 'center',  justifyContent: 'center'}} onPress={() => navigation.navigate('Option')} large bordered dark>
            <Text style={{margin: 10, fontSize: 20, fontWeight: 'bold'} }>Let's Play!</Text>
          </Button>
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