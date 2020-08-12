import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const HowToPlay = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{margin:30}}>HowToPlay</Text>
            <Button
                title="Solid Button"
            />
        </View>
    )
}

export default HowToPlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})