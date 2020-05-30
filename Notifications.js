import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNavigation from './BottomNavigation';
import styles from './styles'

const Notifications = ({ navigation, generalSettings }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Notifications go here.</Text>
      <ScrollView style={{ flex: 1 }} />
      <BottomNavigation navigation={navigation} styles={styles} screenName="Notifications" />
    </SafeAreaView>
  )
}

const mapStateToProps = state => {
  return {
    generalSettings: state.generalSettings
  }
}


const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
