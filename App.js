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
import Personal from './Personal'
import Chat from './Chat'
import Dojo from './Dojo'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import PersistControl from './PersistControl';
import { SET_PERSONAL_SETTING } from './actions';

const axios = require('axios');

const sequentialActionMiddleware = store => next => action => {
  const submitSequentialAction = async (theAction) => {
    const result = await axios.post('http://192.168.1.25:16201/submitSequentialAction', {action: theAction});
  }
  if ((action.source !== 'server') && (action.type != SET_PERSONAL_SETTING)) {
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
          <Stack.Screen name="Personal" component={Personal} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Dojo" component={Dojo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;