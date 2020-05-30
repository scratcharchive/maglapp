import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { addChatItem } from './actions';
import BottomNavigation from './BottomNavigation';
import styles from './styles';

const ChatItem = ({ item }) => {
    return (
        <Text style={styles.chatScreen.chatItem.usernameTextStyle}>{item.user}: &nbsp;
            <Text style={styles.chatScreen.chatItem.textStyle}>{item.text}</Text>
        </Text>
    )
}

const Chat = ({ generalSettings, personalSettings, chatItems, onAddChatItem, navigation }) => {
    const [internalText, setInternalText] = useState('');

    // const fontScaleFactor = personalSettings.fontScaleFactor || 1;

    const handleSubmit = (text) => {
        onAddChatItem({
            id: randomString(10),
            user: personalSettings.userName || 'unknown',
            text: text
        })
        setInternalText('');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {
                    chatItems.map(item => (
                        <ChatItem item={item} key={item.id} />
                    ))
                }
            </ScrollView>
            <TextInput
                style={styles.chatScreen.inputTextStyle}
                onChangeText={text => setInternalText(text)}
                value={internalText}
                onSubmitEditing={(evt) => handleSubmit(evt.nativeEvent.text)}
            />
            <BottomNavigation navigation={navigation} styles={styles} screenName="Chat" />
        </SafeAreaView>
    )
}


function randomString(num_chars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < num_chars; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


const mapStateToProps = state => ({
    chatItems: state.chatItems,
    generalSettings: state.generalSettings,
    personalSettings: state.personalSettings
})


const mapDispatchToProps = dispatch => ({
    onAddChatItem: item => dispatch(addChatItem(item))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)