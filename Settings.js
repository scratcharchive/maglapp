import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemProperty } from './actions';
import Swipeable from 'react-native-swipeable';
import { setGeneralSetting, setPersonalSetting } from './actions';
import { ButtonGroup, Input, FormLabel } from 'react-native-elements';
import Personal from './Personal';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './BottomNavigation';

const Settings = ({ generalSettings, onSetGeneralSetting, personalSettings, onSetPersonalSetting, navigation }) => {
    const buttons = ['General', 'Personal']
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ButtonGroup
                onPress={(newIndex) => {setSelectedIndex(newIndex)}}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 50 }}
            />
            <ScrollView style={{flex: 1}}>
                {
                    buttons[selectedIndex] === 'General' && (
                        <GeneralOld
                            generalSettings={generalSettings}
                            onSetGeneralSetting={onSetGeneralSetting}
                        />
                    )
                }
                {
                    buttons[selectedIndex] === 'Personal' && (
                        <View style={{flex: 1}}>
                            <Personal
                                personalSettings={personalSettings}
                                onSetPersonalSetting={onSetPersonalSetting}
                            />
                        </View>
                    )
                }
            </ScrollView>
            <BottomNavigation navigation={navigation} />
        </SafeAreaView>
    )
}


const GeneralOld = ({ generalSettings, onSetGeneralSetting }) => {
    const [internalNumDaysUntilShopping, setInternalNumDaysUntilShopping] = useState(generalSettings.numDaysUntilShopping || 0);
    const [internalGreetingText, setInternalGreetingText] = useState(generalSettings.greetingText);
    return (
        <View>
            <Input
                label={`Greeting text`}
                placeholder="Hello"
                onChangeText={text => setInternalGreetingText(text)}
                value={internalGreetingText}
                onSubmitEditing={() => { onSetGeneralSetting('greetingText', internalGreetingText) }}
            />

            <Input
                label={`Num. days until shopping`}
                placeholder="7"
                onChangeText={text => setInternalNumDaysUntilShopping(text)}
                value={internalNumDaysUntilShopping}
                onSubmitEditing={() => { onSetGeneralSetting('numDaysUntilShopping', parseInt(internalNumDaysUntilShopping)) }}
            />

            {/* <Text style={styles.settingText}>Greeting text: &nbsp;
                <Text style={styles.currentStatusText}>{generalSettings.greetingText}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalGreetingText(text)}
                value={internalGreetingText}
                onSubmitEditing={() => { onSetGeneralSetting('greetingText', internalGreetingText) }}
            /> */}

            {/* <Text style={styles.settingText}>Num. days until shopping trip: &nbsp;
                <Text style={styles.currentStatusText}>{generalSettings.numDaysUntilShopping}</Text>
            </Text>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalNumDaysUntilShopping(text)}
                value={internalNumDaysUntilShopping + ''}
                onSubmitEditing={() => { onSetGeneralSetting('numDaysUntilShopping', parseInt(internalNumDaysUntilShopping)) }}
            /> */}
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
    generalSettings: state.generalSettings,
    personalSettings: state.personalSettings
})


const mapDispatchToProps = dispatch => ({
    onSetGeneralSetting: (key, val) => dispatch(setGeneralSetting(key, val)),
    onSetPersonalSetting: (key, val) => dispatch(setPersonalSetting(key, val))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)