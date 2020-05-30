import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Screen from './Screen'
import styles from './styles'

const Notifications = ({ navigation, generalSettings }) => {
  return (
    <Screen screenName="Notifications" navigation={navigation}>
      <Text>Notifications go here.</Text>
      <ScrollView style={{ flex: 1 }} />
    </Screen>
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
