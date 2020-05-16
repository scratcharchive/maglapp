import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemApproved } from './actions';
import Swipeable from 'react-native-swipeable';
import { Link } from '@react-navigation/native';

// const initialGroceryItems = [
//     {
//         name: 'bananas'
//     },
//     {
//         name: 'apples'
//     },
//     {
//         name: 'shrimp'
//     },
//     {
//         name: 'toy'
//     },
//     {
//         name: 'toyyy'
//     },
// ]

const GroceryItem = ({ item, onDeleteGroceryItem, onSetGroceryItemApproved }) => {
    const handleToggleApprove = () => {
        if (item.approved) {
            onSetGroceryItemApproved(item.name, false);
        }
        else {
            onSetGroceryItemApproved(item.name, true);
        }
    }
    const leftButtons = [
        <TouchableOpacity
            style={{backgroundColor: 'red', marginTop: 10, marginBottom: 10}}
            onPress={() => {onDeleteGroceryItem(item.name)}}
        >
            <Text style={{color: 'black', fontSize: 28, textAlign: 'right'}}>X</Text>
        </TouchableOpacity>
        // <Button title="Delete" style={{backgroundColor: 'red'}} onPress={() => {onDeleteGroceryItem(item.name)}} />
    ];
    const rightButtons = [
        <TouchableOpacity
            style={{backgroundColor: item.approved ? 'yellow' : 'green', marginTop: 10, marginBottom: 10}}
            onPress={handleToggleApprove}
        >
            <Text style={{color: 'black', fontSize: 28, textAlign: 'left'}}>{item.approved ? 'N' : 'Y'}</Text>
        </TouchableOpacity>
        // <Button title="Delete" style={{backgroundColor: 'red'}} onPress={() => {onDeleteGroceryItem(item.name)}} />
    ];

    return (
        <Swipeable leftButtons={leftButtons} rightButtons={rightButtons}>
            <View style={item.approved ? styles.approvedRow : styles.unapprovedRow}>
                <View style={styles.left}>
                    <Text style={item.approved ? styles.approvedText : styles.unapprovedText}>{item.name}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const Groceries = ({ groceryItems, generalSettings, onAddGroceryItem, onDeleteGroceryItem, onSetGroceryItemApproved }) => {
    const [inputText, setInputText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = (text) => {
        const item = groceryItems.filter(item => (item.name === text))[0];
        if (item) {
            setErrorMessage('Duplicate item.');
            return;
        }
        setErrorMessage(null);
        onAddGroceryItem({
            name: text
        })
        setInputText('');
    }

    const sortedGroceryItems = [...groceryItems];
    sortedGroceryItems.sort((x, y) => {
        if ((x.approved) && (!y.approved)) return -1;
        if ((!x.approved) && (y.approved)) return 1;
        if ((x.name.toLowerCase() < y.name.toLowerCase())) return -1;
        if ((x.name.toLowerCase() > y.name.toLowerCase())) return 1;
        return 0;
    });

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Next grocery trip in <Link to="/General">{generalSettings.numDaysUntilShopping}</Link> days!</Text>
            <FlatList style={{ flex: 1 }}
                data={sortedGroceryItems}
                renderItem={({ item }) => <GroceryItem item={item} onDeleteGroceryItem={onDeleteGroceryItem} onSetGroceryItemApproved={onSetGroceryItemApproved} />}
                keyExtractor={item => (item.name + '---' + item.approved)}
            />
            {
                errorMessage && (
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                )
            }
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setInputText(text)}
                value={inputText}
                onSubmitEditing={(evt) => handleSubmit(evt.nativeEvent.text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        color: 'green',
        fontSize: 24,
        marginLeft: 30
    },
    approvedText: {
        color: 'black',
        fontSize: 24,
        marginLeft: 30
    },
    unapprovedText: {
        color: 'gray',
        fontSize: 24,
        marginLeft: 30
    },
    approvedRow: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    unapprovedRow: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eeeeee'
    },
    headingText: {
        color: 'black',
        fontSize: 32,
        marginLeft: 15
    }
});

const mapStateToProps = state => {
    return {
        generalSettings: state.generalSettings,
        groceryItems: state.groceryItems
    }
}


const mapDispatchToProps = dispatch => ({
    onAddGroceryItem: item => dispatch(addGroceryItem(item)),
    onDeleteGroceryItem: name => dispatch(deleteGroceryItem(name)),
    onSetGroceryItemApproved: (name, approved) => dispatch(setGroceryItemApproved(name, approved))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Groceries)