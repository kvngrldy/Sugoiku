import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { Button } from 'native-base';


const End = ({ navigation, route }) => {
    const { username } = route.params

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Text style={{ fontSize: 18 }}>Sorry, {username} you run out of time</Text>
                </View>
            <View style={styles.btn}>
               <Button  onPress={() => navigation.navigate('Home')} iconLeft bordered primary>
            <AntDesign name="home" size={30} color="black" />
                <Text  style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Let me try again!</Text>
            </Button> 
            </View>

            
            
        </View>
    )
}

export default End

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        
    
        margin: 50
    },
    btn: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 30
    }
})

