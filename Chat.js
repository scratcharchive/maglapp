import React, { useState, createRef } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';
import { addChatItem } from './actions';
import BottomNavigation from './BottomNavigation';
import styles from './styles';
import Screen from './Screen';
import { randomString } from './randomString';

const ChatItem = ({ item }) => {
    return (
        <Text style={styles.chatScreen.chatItem.usernameTextStyle}>{item.user}: &nbsp;
            <Text style={styles.chatScreen.chatItem.textStyle}>{item.text}</Text>
        </Text>
    )
}

const Chat = ({ generalSettings, personalSettings, chatItems, onAddChatItem, navigation }) => {
    const [internalText, setInternalText] = useState('');
    const scrollViewRef = createRef();

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
        <Screen screenName="Chat" navigation={navigation}>
            <ScrollView
                style={{ flex: 1 }}
                ref={scrollViewRef}
                onContentSizeChange={(width, height) => {
                    scrollViewRef.current && scrollViewRef.current.scrollTo({y: height})
                }}
            >
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
        </Screen>
    )
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