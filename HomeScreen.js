import React from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Link } from '@react-navigation/native';
import { connect } from 'react-redux';
import BottomNavigation from './BottomNavigation';
import { Button } from 'react-native-elements';
import styles from './styles';
import Screen from './Screen';

const HomeScreen = ({ navigation, generalSettings, groceryItems }) => {
  const BUTTONS = [
    {
      id: 'groceries',
      title: `Groceries (${groceryItems.length})`,
      to: 'Groceries',
      imageUri: ''
    },
    {
      id: 'chores',
      title: 'Chores',
      to: 'Chores',
      imageUri: ''
    },
    {
      id: 'meals',
      title: 'Meals',
      to: 'Meals',
      imageUri: '',
    },
    {
      id: 'points',
      title: 'Points',
      to: 'Points',
      imageUri: ''
    },
    {
      id: 'bathroomStatus',
      title: 'Bathroom Status',
      to: 'BathroomStatus',
      imageUri: ''
    }
  ];

  return (
    <Screen screenName="Home" navigation={navigation}>
      <Text style={styles.homeScreen.greetingStyle}><Link to="/Settings">{generalSettings.greetingText || "Hello"}</Link></Text>
      <ScrollView style={{flex: 1}}>
        {
          BUTTONS.map(b => (
            <Button
              key={b.id}
              title={b.title}
              type={styles.homeScreen.buttonType}
              buttonStyle={styles.homeScreen.buttonStyle}
              titleStyle={styles.homeScreen.buttonTitleStyle}
              rounded={true}
              onPress={() => navigation.navigate(b.to)}
            />
          ))
        }
      </ScrollView>
    </Screen>
  );
}

const mapStateToProps = state => {
  return {
    generalSettings: state.generalSettings,
    groceryItems: state.groceryItems
  }
}


const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
