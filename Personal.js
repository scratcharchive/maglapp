import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { setPersonalSetting } from './actions';

const Personal = ({ personalSettings, onSetPersonalSetting }) => {
    const [internalUserName, setInternalUserName] = useState(personalSettings.userName);
    const [internalFontScaleFactor, setInternalFontScaleFactor] = useState(personalSettings.fontScaleFactor || 1);
    let useFontScaleFactor = parseFloat(internalFontScaleFactor);
    if (isNaN(useFontScaleFactor)) useFontScaleFactor = 1;
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Personal Settings</Text>
            <Text style={styles.settingText}>User name: &nbsp;
                <Text style={styles.currentStatusText}>{personalSettings.userName}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalUserName(text)}
                value={internalUserName}
                onSubmitEditing={() => {onSetPersonalSetting('userName', internalUserName)}}
            />
            <Text style={styles.settingText}>Font scale factor: &nbsp;
                <Text style={{...styles.currentStatusText, fontSize: 20 * useFontScaleFactor}}>{personalSettings.fontScaleFactor}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalFontScaleFactor(text)}
                value={internalFontScaleFactor}
                onSubmitEditing={() => {onSetPersonalSetting('fontScaleFactor', parseFloat(internalFontScaleFactor))}}
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
    personalSettings: state.personalSettings
})


const mapDispatchToProps = dispatch => ({
    onSetPersonalSetting: (key, val) => dispatch(setPersonalSetting(key, val))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Personal)