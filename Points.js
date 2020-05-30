import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addChatItem } from './actions';
import { Link } from '@react-navigation/native';
import Screen from './Screen';

const ChatItem = ({ item, styles }) => {
    return (
        <Text style={styles.usernameText}>{item.user}: &nbsp;
            <Text style={styles.chatText}>{item.text}</Text>
        </Text>
    )
}

const millisecondsPerDay = 8.64e7;

const styles = {
    dayHeading: {
        fontSize: 24
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20
    },
    pointCount: {
        color: 'green'
    }
}

const Reward = ({ reward, pointsRewardCategories }) => {
    let icon;
    if (reward.category in pointsRewardCategories) {
        const x = pointsRewardCategories[reward.category];
        icon = (
            <Image
                style={{ width: 30, height: 30 }}
                source={{
                    uri: x.imageUri
                }}
            />
        );
    }
    else {
        icon = <Text>{reward.category}</Text>
    }
    return (
        <View style={{ margin: 6, flowDirection: 'row' }}>
            {icon}
            <Text style={{ ...styles.pointCount, textAlign: 'center' }}>{reward.numPoints}</Text>
        </View>
    )
}

function formatDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
}

const PointsDay = ({ pointsDay, pointsRewardCategories }) => {
    const date = new Date(pointsDay.dayNumber * millisecondsPerDay);
    const totalDayPoints = pointsDay.rewards.map(reward => reward.numPoints).reduce((a, b) => (a + b), 0);

    const handleAdd = () => {

    }

    return (
        <View style={{marginBottom: 10, marginTop: 10, borderTopColor: 'lightgray', borderTopWidth: 1}}>
            
            <Text style={styles.dayHeading}>
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>{formatDate(date)}</Text>
                <Text style={styles.pointCount}>&nbsp;&nbsp;&nbsp;({totalDayPoints} points)</Text>
            </Text>
            <View style={{ flexDirection: "row" }}>
                {
                    pointsDay.rewards.map((reward, ii) => (
                        <Reward key={ii} reward={reward} pointsRewardCategories={pointsRewardCategories} />
                    ))
                }
                <Button onPress={handleAdd} title="Add" color="blue" />
            </View>
        </View>
    );
}

const Points = ({ generalSettings, personalSettings, pointsRewards, pointsRewardCategories }) => {
    const currentDayNumber = Math.floor((new Date()).getTime() / millisecondsPerDay);
    const pointsDays = [];
    for (let ii = 0; ii < 10; ii++) {
        const dayNumber = currentDayNumber - ii;
        const date = new Date(dayNumber * millisecondsPerDay);
        pointsDays.push({
            dayNumber,
            rewards: [
            ]
        })
        pointsDays[0].rewards = [{
            category: 'reading',
            numPoints: 3
        },
        {
            category: 'writing',
            numPoints: 3
        },
        {
            category: 'math',
            numPoints: 3
        }
        ];
    }

    const totalPoints = pointsRewards.map(r => r.numPoints).reduce((a, b) => (a+b), 0);

    return (
        <Screen screenName="Points">
            <Text style={styles.header}>Points total: <Text style={styles.pointCount}>{totalPoints}</Text></Text>
            <ScrollView style={{ flex: 1 }}>
                {
                    pointsDays.map(pointsDay => (
                        <PointsDay key={pointsDay.dayNumber} pointsDay={pointsDay} pointsRewardCategories={pointsRewardCategories} />
                    ))
                }
            </ScrollView>
        </Screen>
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
    personalSettings: state.personalSettings,
    pointsRewards: state.pointsRewards || [],
    pointsRewardCategories: state.pointsRewardCategories || {}
})


const mapDispatchToProps = dispatch => ({
    onAddChatItem: item => dispatch(addChatItem(item))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Points)