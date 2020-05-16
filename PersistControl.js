import React, { useEffect, useState } from 'react'
import { Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

const axios = require('axios');

const PersistControl = ({ dispatch }) => {

    const [mode, setMode] = useState('initial');
    const [currentIndex, setCurrentIndex] = useState(0);

    const effect = async () => {
        if (mode === 'initial') {
            setMode('syncing');
            const result = await axios.post('http://192.168.1.241:16201/retrieveSequentialActions', {startIndex: currentIndex});
            if (result.data) {
                for (let action of result.data.actions) {
                    dispatch({...action, source: 'server'});
                }
                setCurrentIndex(currentIndex + result.data.actions.length);
                setMode('finishedSyncing');
            }
            else {
                setMode('errorSyncing');
            }
        }
        else if (mode === 'finishedSyncing') {
            setMode('initial');
        }
    }
    useEffect(() => { effect() });

    return <Text />
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
})

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersistControl)