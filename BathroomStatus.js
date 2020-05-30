import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Screen from './Screen'

const BathroomStatus = ({ bathroomStatus, navigation }) => {
    return (
        <Screen screenName="BathroomStatus" navigation={navigation}>
            <Text>
                {JSON.stringify(bathroomStatus, null, 4)}
            </Text>
        </Screen>
    );
}

const mapStateToProps = state => ({
    bathroomStatus: state.bathroomStatus
})


const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BathroomStatus)