// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, ActionSheetIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import Chores from './Chores'
import Meals from './Meals'
import Groceries from './Groceries'
import General from './General'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import PersistControl from './PersistControl';

const axios = require('axios');

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const sequentialActionMiddleware = store => next => action => {
  const submitSequentialAction = async (theAction) => {
    const result = await axios.post('http://192.168.1.241:16201/submitSequentialAction', {action: theAction});
  }
  if (action.source !== 'server') {
    submitSequentialAction(action);
    return;
  }
  return next(action);
}

function randomString(num_chars) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < num_chars; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// Create the store
const store = createStore(rootReducer, {}, applyMiddleware(sequentialActionMiddleware, thunk))

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistControl />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chores" component={Chores} />
          <Stack.Screen name="Meals" component={Meals} />
          <Stack.Screen name="Groceries" component={Groceries} />
          <Stack.Screen name="General" component={General} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;