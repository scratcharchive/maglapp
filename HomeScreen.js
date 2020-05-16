import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Link } from '@react-navigation/native';

const DATA = [
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
    id: 'groceries',
    title: 'Groceries',
    to: '/Groceries'
  },
  {
    id: 'general',
    title: 'General',
    to: '/General'
  },
];

function Item({ title, to }) {
  return (
    <View style={styles.item} onPress={() => {console.info('test')}}>
        <Link to={to}><Text style={styles.title}>{title}</Text></Link>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} to={item.to} />}
        keyExtractor={item => item.id}
      />
      <Button title="go other" onPress={() => navigation.navigate('Details')} />
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
    padding: 40,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: 'purple',
    fontSize: 32,
  },
});

export default HomeScreen