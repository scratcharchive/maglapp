import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemProperty } from './actions';
import Swipeable from 'react-native-swipeable';
import { Link } from '@react-navigation/native';


const Chores = ({ generalSettings }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Chore chart will appear here.</Text>
        </View>
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