import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './src/screens/LandingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import StudyScreen from './src/screens/StudyScreen';
import StudyDetailScreen from './src/screens/StudyDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Study"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Study" component={StudyScreen} />
        <Stack.Screen name="StudyDetail" component={StudyDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
