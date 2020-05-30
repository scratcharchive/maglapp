import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

const PersonalSettings = ({ personalSettings, onSetPersonalSetting, styles }) => {
    const [internalUserName, setInternalUserName] = useState(personalSettings.userName);

    const items = [
        {
            key: 'user-name',
            label: 'User name',
            placeholder: '',
            value: internalUserName,
            onChangeText: (text => setInternalUserName(text)),
            onSubmitEditing: (() => { onSetPersonalSetting('userName', internalUserName) })
        }
    ]

    return (
        <View>
            {
                items.map(i => (
                    <Input
                        key={i.key}
                        label={i.label}
                        labelStyle={styles.input.labelStyle}
                        inputStyle={styles.input.inputStyle}
                        containerStyle={styles.input.containerStyle}
                        placeholder={i.placeholder + ''}
                        onChangeText={i.onChangeText}
                        value={i.value + ''}
                        onSubmitEditing={i.onSubmitEditing}
                    />
                ))
            }
        </View>
    )
}

export default PersonalSettings