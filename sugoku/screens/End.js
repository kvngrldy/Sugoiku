import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

const End = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{margin:30}}>End</Text>
            <Button
                title="Solid Button"
            />
        </View>
    )
}

export default End

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

