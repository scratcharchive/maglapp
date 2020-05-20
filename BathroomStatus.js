import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';

const BathroomStatus = ({ bathroomStatus }) => {
    return (
        <View>
            <Text>
                {JSON.stringify(bathroomStatus, null, 4)}
            </Text>
        </View>
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