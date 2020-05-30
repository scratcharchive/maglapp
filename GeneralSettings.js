import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

const GeneralSettings = ({ generalSettings, onSetGeneralSetting, styles }) => {
    const [internalNumDaysUntilShopping, setInternalNumDaysUntilShopping] = useState(generalSettings.numDaysUntilShopping || 0);
    const [internalGreetingText, setInternalGreetingText] = useState(generalSettings.greetingText);

    const items = [
        {
            key: 'greeting-text',
            label: 'Greeting text',
            placeholder: 'Hello',
            value: internalGreetingText,
            onChangeText: (text => setInternalGreetingText(text)),
            onSubmitEditing: (() => { onSetGeneralSetting('greetingText', internalGreetingText) })
        },
        {
            key: 'num-days-until-shopping',
            label: 'Num. days until shopping',
            placeholder: 7,
            value: internalNumDaysUntilShopping,
            onChangeText: (text => setInternalNumDaysUntilShopping(text)),
            onSubmitEditing: (() => { onSetGeneralSetting('numDaysUntilShopping', parseInt(internalNumDaysUntilShopping)) })
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

export default GeneralSettings