
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import BottomNavigation from './BottomNavigation';
import styles from './styles';


const Screen = ({ screenName, children, navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex: 1}}>
                {children}
            </View>
            <BottomNavigation navigation={navigation} styles={styles} screenName={screenName} />
        </SafeAreaView>
    )
}

export default Screen