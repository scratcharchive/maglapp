import React, { useEffect, useState } from 'react'
import { Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setPersonalSetting } from './actions'

const axios = require('axios');

const PersistControl = ({ dispatch, onSetPersonalSetting, personalSettings }) => {

    const [mode, setMode] = useState('initial');
    const [currentIndex, setCurrentIndex] = useState(0);

    const effect = async () => {
        if (mode === 'initial') {
            const personalSettings0 = await getItem('personalSettings', {});
            for (let key in personalSettings0) {
                onSetPersonalSetting(key, personalSettings0[key]);
            }
            setMode('syncing');
        }
        else if (mode === 'syncing') {
            setMode('syncStarted');
            await sleepMsec(300);
            const result = await axios.post('http://192.168.1.241:16201/retrieveSequentialActions', {startIndex: currentIndex});
            if (result.data) {
                for (let action of result.data.actions) {
                    dispatch({...action, source: 'server'});
                }
                setCurrentIndex(currentIndex + result.data.actions.length);
                setMode('syncFinished');
            }
            else {
                setMode('syncError');
            }
        }
        else if (mode === 'syncFinished') {
            await setItem('personalSettings', personalSettings);
            setMode('syncing');
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