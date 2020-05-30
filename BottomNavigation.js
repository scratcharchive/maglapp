import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const iconSize = 40;
const iconColor = 'gray';

const BottomNavigation = ({ navigation, styles, screenName }) => {
    const buttons = [
        {
            iconName: "settings",
            key: "settings",
            to: "Settings"
        },
        {
            iconName: "home",
            key: "home",
            to: "Home"
        },
        {
            iconName: "chat-bubble",
            key: "chat",
            to: "Chat"
        },
        {
            iconName: "notifications",
            key: "notifications",
            to: "Notifications"
        }
    ]
    return (
        <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}>
            {
                buttons.map(button => (
                    screenName !== button.to ? (
                        <Icon
                            key={button.key}
                            name={button.iconName}
                            size={styles.bottomNavigation.iconSize}
                            color={styles.bottomNavigation.iconColor}
                            onPress={() => navigation.navigate(button.to)}
                        />
                    ) : (
                        <Icon
                            key={button.key}
                            name={button.iconName}
                            size={styles.bottomNavigation.iconSize}
                            color={styles.bottomNavigation.disabledIconColor}
                        />
                    )
                ))
            }
        </View>
    )
}

export default BottomNavigation;