import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemApproved } from './actions';
import Swipeable from 'react-native-swipeable';
import { setGeneralSetting } from './actions';

const General = ({ generalSettings, onSetGeneralSetting }) => {
    const [internalNumDaysUntilShopping, setInternalNumDaysUntilShopping] = useState(generalSettings.numDaysUntilShopping || 0);
    const [internalGreetingText, setInternalGreetingText] = useState(generalSettings.greetingText);
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>General Settings</Text>
            <Text style={styles.settingText}>Greeting text: &nbsp;
                <Text style={styles.currentStatusText}>{generalSettings.greetingText}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalGreetingText(text)}
                value={internalGreetingText}
                onSubmitEditing={() => {onSetGeneralSetting('greetingText', internalGreetingText)}}
            />

            <Text style={styles.settingText}>Num. days until shopping trip: &nbsp;
                <Text style={styles.currentStatusText}>{generalSettings.numDaysUntilShopping}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalNumDaysUntilShopping(text)}
                value={internalNumDaysUntilShopping + ''}
                onSubmitEditing={() => {onSetGeneralSetting('numDaysUntilShopping', parseInt(internalNumDaysUntilShopping))}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    settingText: {
        color: '#6699cc',
        fontSize: 24,
        marginLeft: 15,
        marginTop: 15
    },
    headingText: {
        color: 'white',
        fontSize: 32,
        backgroundColor: 'lightblue',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        paddingHorizontal: 15
    },
    currentStatusText: {
        color: 'black',
        fontSize: 20,
    }
})


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