import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Button, TouchableOpacity, Clipboard } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { addGroceryItem, deleteGroceryItem, setGroceryItemProperty } from './actions';
import Swipeable from 'react-native-swipeable';
import { Link } from '@react-navigation/native';
import { ListItem, Overlay, CheckBox } from 'react-native-elements'
import { Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const rightIconSize = 26;
const itemHeight = 50;

const Groceries = ({ groceryItems, generalSettings, onAddGroceryItem, onDeleteGroceryItem, onSetGroceryItemProperty }) => {
    const [inputText, setInputText] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [selectedGroceries, setSelectedGroceries] = useState({});
    const [showSettings, setShowSettings] = useState(false);
    const [hideUnapproved, setHideUnapproved] = useState(false);
    const [addMode, setAddMode] = useState(false);

    const inputRef = React.createRef();

    if ((!addMode) && (errorMessage)) {
        setErrorMessage(null);
    }

    const handleSubmit = (text) => {
        const item = groceryItems.filter(item => (item.name === text))[0];
        if (item) {
            setErrorMessage('Duplicate item.');
            return;
        }
        setErrorMessage(null);
        onAddGroceryItem({
            name: text,
            pendingApproval: true
        })
        setInputText('');
        setAddMode(false);
    }

    let sortedGroceryItems = [...groceryItems];
    sortedGroceryItems.sort((x, y) => {
        if ((!x.pendingApproval) && (y.pendingApproval)) return -1;
        if ((x.pendingApproval) && (!y.pendingApproval)) return 1;
        if ((x.name.toLowerCase() < y.name.toLowerCase())) return -1;
        if ((x.name.toLowerCase() > y.name.toLowerCase())) return 1;
        return 0;
    });
    if (hideUnapproved) {
        sortedGroceryItems = sortedGroceryItems.filter(item => (!item.pendingApproval));
    }
    const selectedContainerStyle = {
        backgroundColor: 'lightblue',
        height: itemHeight
    }

    const unselectedContainerStyle = {
        height: itemHeight
    }

    const handleLongPress = (name) => {
        setSelectedGroceries({ ...selectedGroceries, [name]: !(selectedGroceries[name]) });
        setAddMode(false);
    }

    let somethingSelected = false;
    for (let key in selectedGroceries) {
        if (selectedGroceries[key]) {
            somethingSelected = true;
        }
    }

    let somethingSelectedIsApproved = false;
    let somethingSelectedIsNotApproved = false;
    for (let item of groceryItems) {
        if (selectedGroceries[item.name]) {
            if (item.pendingApproval)
                somethingSelectedIsNotApproved = true;
            else
                somethingSelectedIsApproved = true;
        }
    }

    const handlePress = (name) => {
        if (somethingSelected) handleLongPress(name);
        setAddMode(false);
    }

    const handleDelete = () => {
        for (let name in selectedGroceries) {
            if (selectedGroceries[name]) {
                onDeleteGroceryItem(name);
            }
        }
        setSelectedGroceries({});
    }

    const handleApprove = () => {
        for (let name in selectedGroceries) {
            if (selectedGroceries[name]) {
                onSetGroceryItemProperty(name, 'pendingApproval', false)
            }
        }
        setSelectedGroceries({});
    }

    const handleDisapprove = () => {
        for (let name in selectedGroceries) {
            if (selectedGroceries[name]) {
                onSetGroceryItemProperty(name, 'pendingApproval', true);
            }
        }
        setSelectedGroceries({});
    }

    const handleCopyToClipboard = () => {
        const text = sortedGroceryItems.map(i => i.name).join('\n');
        Clipboard.setString(text);
    }

    const handleCopySelectedToClipboard = () => {
        const text = sortedGroceryItems.filter(i => selectedGroceries[i.name]).map(i => i.name).join('\n');
        Clipboard.setString(text);
    }

    const handleSelectAll = () => {
        // first check to see if everything was already selected, in that case unselect everything
        let everythingWasAlreadySelected = true;
        for (let item of sortedGroceryItems) {
            if (!selectedGroceries[item.name]) everythingWasAlreadySelected = false;
        }
        if (everythingWasAlreadySelected) {
            setSelectedGroceries({});
            return;
        }

        const newSelectedGroceries = {};
        for (let item of sortedGroceryItems) {
            newSelectedGroceries[item.name] = true;
        }
        setSelectedGroceries(newSelectedGroceries);
    }
    const handleUnselectAll = () => {
        setSelectedGroceries({})
    }

    const handleAdd = () => {
        setAddMode(true);
    }

    const handleEscapeAdd = () => {
        setAddMode(false);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    const menuIconStyle = {
        marginLeft: 4,
        paddingRight: 4,
        paddingBottom: 4,
        paddingTop: 4
    }

    const menuIconRaised = false;

    const menuUnselectAllIcon = (
        <Icon
            name='keyboard-backspace'
            onPress={handleUnselectAll}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )
    const menuSelectAllIcon = (
        <Icon
            name='check'
            onPress={handleSelectAll}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )
    const menuCopyToClipboardIcon = (
        <Icon
            name="clipboard"
            type="font-awesome"
            onPress={handleCopySelectedToClipboard}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )

    const menuApproveIcon = (
        <Icon
            name="thumb-up"
            color={somethingSelectedIsNotApproved ? 'black': 'gray'}
            onPress={somethingSelectedIsNotApproved ? handleApprove : undefined}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )
    const menuDisapproveIcon = (
        <Icon
            name="thumb-down"
            color={somethingSelectedIsApproved ? 'black': 'gray'}
            onPress={somethingSelectedIsApproved ? handleDisapprove : undefined}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )
    const menuDeleteIcon = (
        <Icon
            name='delete'
            onPress={handleDelete}
            disabled= {!somethingSelected}
            raised={menuIconRaised}
            iconStyle={menuIconStyle}
        />
    )

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Next grocery trip in <Link to="/General">{generalSettings.numDaysUntilShopping}</Link> days!</Text>
            {
                somethingSelected ? (
                    <View style={{backgroundColor: 'white', borderBottomColor: 'gray', flexDirection: 'row-reverse'}}>
                        {menuDeleteIcon}
                        {menuApproveIcon}
                        {menuDisapproveIcon}
                        {menuCopyToClipboardIcon}
                        {menuSelectAllIcon}
                        <View style={{flex: 1}} />
                        {menuUnselectAllIcon}
                    </View>
                ) : (
                    (
                        <View>
                            <View style={{backgroundColor: 'white', borderBottomColor: 'gray', flexDirection: 'row', alignItems: "center"}}>
                                {/* <Icon name="menu" onPress={() => setShowSettings(true)} /> */}
                                <Text>&nbsp;&nbsp;</Text>
                                <Icon name="clipboard" type="font-awesome" onPress={handleCopyToClipboard} />
                                <CheckBox title="Hide unapproved" checked={hideUnapproved} onPress={() => setHideUnapproved(!hideUnapproved)} />
                                <View style={{flex: 1}} />
                                {
                                    addMode ? (
                                        <Icon name="remove" color="green" size={40} onPress={handleEscapeAdd} />
                                    ) : (
                                        <Icon name="add" color="green" size={40} onPress={handleAdd} />
                                    )
                                }
                            </View>
                        </View>
                    )
                )
            }
            {
                addMode && (
                    <TextInput
                        ref={inputRef}
                        style={styles.inputText}
                        onChangeText={text => setInputText(text)}
                        value={inputText}
                        onSubmitEditing={(evt) => handleSubmit(evt.nativeEvent.text)}
                    />
                )
            }
            {
                errorMessage && (
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                )
            }
            <ScrollView style={{flex: 1}}>
                {
                    sortedGroceryItems.map((l, i) => {
                        const pendingApprovalString = l.pendingApproval ? ' (pending...)' : ''
                        const rightIcon = l.pendingApproval ? (
                            <Icon name="thumb-up" color="gray" size={rightIconSize} onPress={() => onSetGroceryItemProperty(l.name, 'pendingApproval', false)} />
                        ) : undefined;
                        return (
                            <ListItem
                                key={i}
                                title={`${l.name}${pendingApprovalString}`}
                                rightElement={rightIcon}
                                bottomDivider
                                underlayColor="lightblue"
                                activeOpacity={0.7}
                                titleStyle={l.pendingApproval ? {color: 'gray'} : {}}
                                containerStyle={selectedGroceries[l.name] ? selectedContainerStyle : unselectedContainerStyle}
                                onLongPress={() => handleLongPress(l.name)}
                                onPress={() => handlePress(l.name)}
                            />
                        )
                    })
                }
                <ListItem
                    key={"new"}
                    title="Add item"
                    titleStyle={{fontSize: 10, color: 'green'}}
                    bottomDivider
                    containerStyle={unselectedContainerStyle}
                    onPress={handleAdd}
                />
            </ScrollView>

            {
            /* <FlatList style={{ flex: 1 }}
                data={sortedGroceryItems}
                renderItem={({ item }) => <GroceryItem item={item} onDeleteGroceryItem={onDeleteGroceryItem} onSetGroceryItemApproved={onSetGroceryItemApproved} />}
                keyExtractor={item => (item.name + ':::' + item.approved)}
            />
            */}

            {/* <Overlay isVisible={showSettings} onBackdropPress={() => {setShowSettings(false)}}>
                <View>
                    <CheckBox title={"Hide unapproved items"} />
                </View>
            </Overlay> */}
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
        alignItems: 'center',
        borderTopColor: '#eeeeee',
        borderTopWidth: 1
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
        backgroundColor: '#eeeeee',
        borderTopColor: '#dddddd',
        borderTopWidth: 1
    },
    headingText: {
        color: 'white',
        fontSize: 32,
        backgroundColor: 'lightblue',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
});

const mapStateToProps = state => {
    return {
        generalSettings: state.generalSettings,
        groceryItems: state.groceryItems
    }
}


const mapDispatchToProps = dispatch => ({
    onAddGroceryItem: item => { dispatch(addGroceryItem(item)) },
    onDeleteGroceryItem: name => dispatch(deleteGroceryItem(name)),
    onSetGroceryItemProperty: (name, key, value) => dispatch(setGroceryItemProperty(name, key, value))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Groceries)