import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addChatItem } from './actions';
import Swipeable from 'react-native-swipeable';
import { setGeneralSetting } from './actions';
import personalSettings from './reducers/personalSettings';
import BottomNavigation from './BottomNavigation';

const ChatItem = ({ item, styles }) => {
    return (
        <Text style={styles.usernameText}>{item.user}: &nbsp;
            <Text style={styles.chatText}>{item.text}</Text>
        </Text>
    )
}

const Chat = ({ generalSettings, personalSettings, chatItems, onAddChatItem, navigation }) => {
    const [internalText, setInternalText] = useState('');

    const fontScaleFactor = personalSettings.fontScaleFactor || 1;
    const styles = StyleSheet.create({
        chatText: {
            color: 'black',
            fontSize: 20 * fontScaleFactor,
            marginHorizontal: 35,
            marginTop: 15 * fontScaleFactor
        },
        inputText: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 30,
            marginTop: 10,
            paddingHorizontal: 15
        },
        usernameText: {
            color: 'blue',
            fontSize: 20 * fontScaleFactor,
            marginLeft: 35,
            marginTop: 15 * fontScaleFactor
        }
    })
    

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
                        <ChatItem item={item} styles={styles} key={item.id} />
                    ))
                }
            </ScrollView>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setInternalText(text)}
                value={internalText}
                onSubmitEditing={(evt) => handleSubmit(evt.nativeEvent.text)}
            />
            <BottomNavigation navigation={navigation} />
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