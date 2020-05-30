// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, ActionSheetIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import Chores from './Chores'
import Notifications from './Notifications'
import Meals from './Meals'
import Groceries from './Groceries'
import Settings from './Settings'
import Chat from './Chat'
import Points from './Points'
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

// Create the store
const store = createStore(rootReducer, {}, applyMiddleware(persistStateMiddleware, thunk))

const listenToActionStream = async (key) => {
  const esc = new EventStreamClient('http://192.168.1.25:16201', 'readwrite', 'readwrite');
  const stream = esc.getStream({ key: key });
  while (true) {
    const events = await stream.readEvents(3000);
    for (let e of events) {
      e.source = 'fromActionStream';
      store.dispatch(e);
    }
    await sleepMsec(500);
  }
}
['bathroomStatus', 'chatItems', 'generalSettings', 'groceryItems', 'mealItems'].forEach(
  key => listenToActionStream(key)
)

function sleepMsec(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Stack = createStackNavigator();

import { ThemeProvider } from 'react-native-elements';

const theme = {
};

const opts = {
  animationEnabled: false
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistControl />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Settings" options={opts} component={Settings} />
            <Stack.Screen name="Home" options={opts} component={HomeScreen} />
            <Stack.Screen name="Chat" options={opts} component={Chat} />
            <Stack.Screen name="Notifications" options={opts} component={Notifications} />
            <Stack.Screen name="Chores" options={opts} component={Chores} />
            <Stack.Screen name="Meals" options={opts} component={Meals} />
            <Stack.Screen name="Groceries" options={opts} component={Groceries} />
            <Stack.Screen name="Points" options={opts} component={Points} />
            <Stack.Screen name="BathroomStatus" options={opts} component={BathroomStatus} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}

export default App;