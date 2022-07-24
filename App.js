import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ISSLocation from './screens/ISSLocation';
import {StatusBar} from  'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MeteorsLocation from './screens/MeteorsLocation';

const Stack =  createStackNavigator()

 function App () {
  return(
    
    <NavigationContainer>

      <Stack.Navigator intialrouteName = "ISS">
      <Stack.Screen name = "ISS" component = {ISSLocation} />
        <Stack.Screen name = "Home" component = {HomeScreen} />
        
        <Stack.Screen name = "Meteors" component = {MeteorsLocation} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}

export default App ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
