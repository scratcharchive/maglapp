import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { SafeAreaView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Link } from '@react-navigation/native';
import { connect } from 'react-redux';

function Item({ title, to, imageUri }) {
  return (
    <View style={styles.item} onPress={() => {console.info('test')}}>
        <Link to={to}><Text style={styles.title}>{title}</Text><Image
          style={styles.image}
          source={{
            uri: imageUri
          }}
        /></Link>
    </View>
  );
}

const HomeScreen = ({ navigation, generalSettings, groceryItems }) => {
  const BUTTONS = [
    {
      id: 'groceries',
      title: `Groceries (${groceryItems.length})`,
      to: '/Groceries',
      imageUri: ''
    },
    {
      id: 'chores',
      title: 'Chores',
      to: '/Chores',
      imageUri: ''
    },
    {
      id: 'meals',
      title: 'Meals',
      to: '/Meals',
      imageUri: '',
    },
    {
      id: 'dojo',
      title: 'Dojo',
      to: '/Dojo',
      imageUri: 'data:image/png;base64,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'
    },
    {
      id: 'chat',
      title: 'Chat',
      to: '/Chat',
      imageUri: ''
    },
    {
      id: 'general',
      title: 'General',
      to: '/General',
      imageUri: ''
    },
    {
      id: 'personal',
      title: 'Personal',
      to: '/Personal',
      imageUri: ''
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}><Link to="/General">{generalSettings.greetingText || "Generic greeting"}</Link></Text>
      <FlatList
        data={BUTTONS}
        renderItem={({ item }) => <Item title={item.title} to={item.to} imageUri={item.imageUri}/>}
        keyExtractor={item => item.id}
      />
      
      {/* <View>
        <View style={styles.button}><Text>Settings</Text></View>
        <View style={styles.button}><Text>Home</Text></View>
        <View style={styles.button}><Text>Chat</Text></View>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  containerBottom: {
    flex: 1,
    height: 30,
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
  image: {
    width: 40,
    height: 40
  }
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
