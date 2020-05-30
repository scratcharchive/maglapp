import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setGeneralSetting, setPersonalSetting } from './actions';
import { ButtonGroup } from 'react-native-elements';
import PersonalSettings from './PersonalSettings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Screen from './Screen';
import GeneralSettings from './GeneralSettings';
import styles from './styles';

const Settings = ({ generalSettings, onSetGeneralSetting, personalSettings, onSetPersonalSetting, navigation }) => {
    const buttons = ['General', 'Personal']
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Screen screenName="Settings" navigation={navigation}>
            <ButtonGroup
                onPress={(newIndex) => {setSelectedIndex(newIndex)}}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={styles.settingsScreen.topButtonBar.containerStyle}
            />
            <ScrollView style={{flex: 1}}>
                {
                    buttons[selectedIndex] === 'General' && (
                        <GeneralSettings
                            generalSettings={generalSettings}
                            onSetGeneralSetting={onSetGeneralSetting}
                            styles={styles}
                        />
                    )
                }
                {
                    buttons[selectedIndex] === 'Personal' && (
                        <View style={{flex: 1}}>
                            <PersonalSettings
                                personalSettings={personalSettings}
                                onSetPersonalSetting={onSetPersonalSetting}
                                styles={styles}
                            />
                        </View>
                    )
                }
            </ScrollView>
        </Screen>
    )
}

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