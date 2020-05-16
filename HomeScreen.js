import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Link } from '@react-navigation/native';
import { connect } from 'react-redux';

function Item({ title, to }) {
  return (
    <View style={styles.item} onPress={() => {console.info('test')}}>
        <Link to={to}><Text style={styles.title}>{title}</Text></Link>
    </View>
  );
}

const HomeScreen = ({ navigation, generalSettings, groceryItems }) => {
  const BUTTONS = [
    {
      id: 'groceries',
      title: `Groceries (${groceryItems.length})`,
      to: '/Groceries'
    },
    {
      id: 'chores',
      title: 'Chores',
      to: '/Chores'
    },
    {
      id: 'meals',
      title: 'Meals',
      to: '/Meals'
    },
    {
      id: 'chat',
      title: 'Chat',
      to: '/Chat'
    },
    {
      id: 'general',
      title: 'General',
      to: '/General'
    },
    {
      id: 'personal',
      title: 'Personal',
      to: '/Personal'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}><Link to="/General">{generalSettings.greetingText || "Generic greeting"}</Link></Text>
      <FlatList
        data={BUTTONS}
        renderItem={({ item }) => <Item title={item.title} to={item.to} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#e5ddf3',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 5,
    marginHorizontal: 16,
  },
  greeting: {
    color: 'violet',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20
  },
  title: {
    color: 'gray',
    fontSize: 32,
  },
});

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
