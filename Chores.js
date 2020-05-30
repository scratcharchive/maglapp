import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Screen from './Screen'


const Chores = ({ generalSettings, navigation }) => {
    return (
        <Screen screenName="Chores" navigation={navigation}>
            <Text>Chore chart will appear here.</Text>
        </Screen>
    )
}

const mapStateToProps = state => {
    return {
        generalSettings: state.generalSettings,
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chores)