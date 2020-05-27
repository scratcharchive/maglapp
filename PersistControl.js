import React, { useEffect, useState } from 'react'
import { Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setPersonalSetting } from './actions'

const PersistControl = ({ dispatch, onSetPersonalSetting, personalSettings }) => {
    const [mode, setMode] = useState('initial');

    const effect = async () => {
        if (mode === 'initial') {
            const personalSettings0 = await getItem('personalSettings', {});
            for (let key in personalSettings0) {
                onSetPersonalSetting(key, personalSettings0[key]);
            }
            setMode('done');
        }
        else if (mode === 'done') {
            setMode('syncing');
            await setItem('personalSettings', personalSettings);
            await sleepMsec(3000);
            setMode('done');
        }
    }
    useEffect(() => { effect() });

    return <Text />
}

function sleepMsec(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getItem(key, defaultValue) {
    try {
        const a = await AsyncStorage.getItem(key);
        return JSON.parse(a);
    }
    catch (err) {
        return defaultValue;
    }

}

async function setItem(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

const mapStateToProps = state => ({
    personalSettings: state.personalSettings
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    onSetPersonalSetting: (key, value) => dispatch(setPersonalSetting(key, value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersistControl)