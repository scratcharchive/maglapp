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
import BathroomStatus from './BathroomStatus'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import PersistControl from './PersistControl';
import { SET_PERSONAL_SETTING } from './actions';
import { EventStreamClient } from './loggery'

const axios = require('axios');

const persistStateMiddleware = store => next => action => {
  const esc = new EventStreamClient('http://192.168.1.25:16201', 'readwrite', 'readwrite');
  const writeAction = async (key, theAction) => {
    const stream = esc.getStream({ key: key });
    await stream.writeEvent(theAction);
  }

  if ((action.persistKey) && (action.source !== 'fromActionStream')) {
    writeAction(action.persistKey, action);
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
const store = createStore(rootReducer, {}, applyMiddleware(persistStateMiddleware, thunk))

const listenToActionStream = async (key) => {
  const esc = new EventStreamClient('http://192.168.1.25:16201', 'readwrite', 'readwrite');
  const stream = esc.getStream({ key: key });
  while (true) {
    await sleepMsec(500);
    const events = await stream.readEvents(3000);
    for (let e of events) {
      console.log('--- event', e);
      e.source = 'fromActionStream';
      store.dispatch(e);
    }
  }
}
['bathroomStatus', 'chatItems', 'generalSettings', 'groceryItems'].forEach(
  key => listenToActionStream(key)
)

function sleepMsec(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Stack = createStackNavigator();

import { ThemeProvider } from 'react-native-elements';

const theme = {
  Input: {
    labelStyle: { fontSize: 18, color: 'purple' }
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
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
            <Stack.Screen name="BathroomStatus" component={BathroomStatus} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}

export default App;