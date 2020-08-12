import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, HowToPlay, Option, Game, End } from './screens'
import store from './store'
import { Provider} from 'react-redux'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="HowToPlay" component={HowToPlay}></Stack.Screen>
        <Stack.Screen name="Option" component={Option}></Stack.Screen>
        <Stack.Screen name="Game" component={Game}></Stack.Screen>
        <Stack.Screen name="End" component={End}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    
  )
}

export default App
