import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Container, Header, Content, Item, Input, Button } from 'native-base';

const Option = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [difficultySelector, setDifficultySelector] = useState(false)


    const usernameCheck = (text) => {
        setUsername(text)
        if (text.length > 2) {
            setDifficultySelector(true)
        } else {
            setDifficultySelector(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.input}>


                <Image
                    source={require('../assets/WHOAREYOU.png')}
                />
                <Item rounded>
                    <Input style={{marginHorizontal: 30}} onChangeText={(text) => usernameCheck(text)} placeholder='Enter Username!' />
                </Item>
            </View>
            
            <View style={styles.difficulty}>
                <Image
                    source={require('../assets/DIFFICULTY.png')}
                />
                {difficultySelector && <View style={styles.selection}>
                    <Button large bordered  iconRight onPress={() => navigation.navigate('Game', {
                        difficulty: 'hard',
                        username
                    })}>
                        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Hard</Text>
                        <FontAwesome5 name="skull" size={30} color="black" style={{ margin: 10 }} />
                    </Button>
                    <Button large bordered iconRight onPress={() => navigation.navigate('Game', {
                        difficulty: 'medium',
                        username
                    })}>
                        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Medium</Text>
                        <Ionicons name="md-happy" size={30} color="black" style={{ margin: 10 }} />
                    </Button>
                    <Button large bordered iconRight onPress={() => navigation.navigate('Game', {
                        difficulty: 'easy',
                        username
                    })}>
                        <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>Easy</Text>
                        <FontAwesome5 name="sad-tear" size={30} color="black" style={{ margin: 10 }} />
                    </Button>
                </View>}
                    
                </View>
            

        </View>
    )
}

export default Option

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0
    },
    difficulty: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    selection: {
        flex: 1,
        flexDirection: 'row',
        
        alignItems: 'center'
    }
    
    
})