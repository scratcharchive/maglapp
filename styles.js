const homeScreen = {
    greetingStyle: {
        color: 'black',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    buttonType: "outline",
    buttonStyle: {
        paddingVertical: 15,
        marginVertical: 5,
        marginHorizontal: 30,
        borderColor: 'blue',
        backgroundColor: 'white',
        borderWidth: 1
    },
    buttonTitleStyle: {
        color: 'blue'
    }
}

const settingsScreen = {
    topButtonBar: {
        containerStyle: {
            height: 50
        }
    }
}

const chatScreen = {
    chatItem: {
        usernameTextStyle: {
            color: 'blue',
            fontSize: 20,
            marginLeft: 35,
            marginTop: 15
        },
        textStyle: {
            color: 'black',
            fontSize: 20,
            marginHorizontal: 35,
            marginTop: 15
        }
    },
    inputTextStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        marginTop: 10,
        paddingHorizontal: 15
    }
}

const bottomNavigation = {
    iconColor: 'blue',
    iconSize: 40,
    disabledIconColor: 'gray'
}

const input = {
    inputStyle: {
        // see https://reactnative.dev/docs/textinput
        color: 'black',
        fontSize: 16
    },
    labelStyle: {
        color: 'blue',
        fontSize: 16
    },
    containerStyle: {
        paddingHorizontal: 20
    }
}

const groceriesScreen = {
    item: {
        containerStyle: {
            height: 50
        },
        rightIconSize: 26
    },
    selectedItem: {
        containerStyle: {
            backgroundColor: 'lightblue'
        }
    },
    menuIconStyle: {
        marginLeft: 4,
        paddingRight: 12,
        paddingBottom: 4,
        paddingTop: 4
    }
}

const styles = {
    homeScreen,
    settingsScreen,
    chatScreen,
    bottomNavigation,
    groceriesScreen,
    input
}

export default styles;