import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemApproved } from './actions';
import Swipeable from 'react-native-swipeable';
import { setGeneralSetting } from './actions';

const General = ({ generalSettings, onSetGeneralSetting }) => {
    const [internalNumDaysUntilShopping, setInternalNumDaysUntilShopping] = useState(generalSettings.numDaysUntilShopping || 0);
    return (
        <View style={{ flex: 1 }}>
            <Text>Number of days until next shopping trip: {generalSettings.numDaysUntilShopping}</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setInternalNumDaysUntilShopping(text)}
                value={internalNumDaysUntilShopping + ''}
                onSubmitEditing={() => {onSetGeneralSetting('numDaysUntilShopping', parseInt(internalNumDaysUntilShopping))}}
            />
        </View>
    )
}


const mapStateToProps = state => ({
    generalSettings: state.generalSettings
})


const mapDispatchToProps = dispatch => ({
    onSetGeneralSetting: (key, val) => dispatch(setGeneralSetting(key, val))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(General)