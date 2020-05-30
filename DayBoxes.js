import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableHighlight, ScrollView, TextInput } from 'react-native';
import { currentDayNumber, dayNumberToDate, dayOfMonth, dayOfWeekName, monthName } from './dayNumber'
import { View } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const DayBox = ({ dayNumber, boxHeight, boxSpacing, items, onAddItem, onDeleteItem }) => {

    const [expanded, setExpanded] = useState(false)
    const [addingItem, setAddingItem] = useState(false);

    const handleExpandDay = () => {
        setAddingItem(false);
        setExpanded(true);
    }
    const handleExpandDayAndAddItem = () => {
        setAddingItem(true);
        setExpanded(true);
    }

    const dayItems = items.filter(item => (item.dayNumber === dayNumber))

    if (!expanded) {
        return (
            <Card containerStyle={{ paddingTop: 0, height: boxHeight, marginTop: boxSpacing, marginBottom: 0 }}>
                    <View style={{ flexDirection: "row" }}>
                        <DayDisplay dayNumber={dayNumber} onPress={handleExpandDay} />
                        <TouchableHighlight underlayColor="gray" style={{flex: 1}} onPress={handleExpandDay}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 20, marginTop: 20 }}>
                                {
                                    dayItems.map(item => (
                                        <ItemView item={item} />
                                    ))
                                }
                            </View>
                        </TouchableHighlight>
                        {
                            <View style={{ flexDirection: "column", marginLeft: 20, marginTop: 20 }}>
                                <Icon name="add" onPress={handleExpandDayAndAddItem} />
                            </View>
                        }
                    </View>
            </Card>
        )
    }
    else {
        return (
            <ExpandedDayBox
                dayNumber={dayNumber}
                dayItems={dayItems}
                onCollapse={() => setExpanded(false)}
                addingItem={addingItem}
                onAddItem={onAddItem}
                onDeleteItem={item => onDeleteItem(item)}
            />
        )
    }
}

const inputTextStyle = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
};

const ExpandedDayBox = ({ dayNumber, dayItems, onCollapse, onDeleteItem, addingItem, onAddItem }) => {
    const [internalAddingItem, setInternalAddingItem] = useState(addingItem)
    const [internalInputText, setInternalInputText] = useState('')
    const inputRef = useRef();

    const handleSubmitAddItem = (text) => {
        setInternalInputText('');
        setInternalAddingItem(false);
        onAddItem({dayNumber, text});
    }

    const handleStartAddItem = () => {
        setInternalInputText('');
        setInternalAddingItem(true);
    }

    const handleStopAddItem = () => {
        setInternalInputText('');
        setInternalAddingItem(false);
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    return (
        <Card containerStyle={{ paddingTop: 0, minHeight: 250, marginTop: 30, marginBottom: 30 }}>
                <View style={{ flexDirection: "row" }}>
                    <DayDisplay dayNumber={dayNumber} onPress={onCollapse} />
                    <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginLeft: 20, marginTop: 20 }}>
                        {
                            dayItems.map(item => (
                                <ExpandedItemView key={item.id} item={item} onDelete={() => onDeleteItem(item)} />
                            ))
                        }
                    </View>
                    {
                        internalAddingItem ? (
                            <Icon name="cancel" size={50} color="blue" onPress={handleStopAddItem} />
                        ) : (
                            <Icon name="add" size={50} color="green" onPress={handleStartAddItem} />
                        )
                    }
                </View>
                {
                    internalAddingItem && (
                        <TextInput
                            ref={inputRef}
                            style={inputTextStyle}
                            onChangeText={text => setInternalInputText(text)}
                            value={internalInputText}
                            onSubmitEditing={(evt) => handleSubmitAddItem(evt.nativeEvent.text)}
                        />
                    )
                }
        </Card>
    )
}

const ItemView = ({ item }) => {
    return (
        <View style={{flexDirection: "row", paddingHorizontal: 20}}>
            <Text>{item.label}</Text>
        </View>
    )
}

const ExpandedItemView = ({ item, onDelete }) => {
    return (
        <View style={{flexDirection: "row", paddingHorizontal: 20}}>
            <Icon name="delete" color="red" onPress={onDelete} />
            <Text>{item.label}</Text>
        </View>
    )
}

const DayDisplay = ({ dayNumber, onPress }) => {
    const d = dayNumber
    const dayOfWeekStyle = {
        fontSize: 36,
        color: 'blue'
    }
    const monthStyle = {
        fontSize: 18,
        color: 'black'
    }
    const todayStyle = {
        fontSize: 12,
        color: 'green',
        fontWeight: 'bold'
    }

    return (
        <TouchableHighlight underlayColor="gray" onPress={onPress}>
            <View style={{ flexDirection: "column" }}>
                <Text style={dayOfWeekStyle}>{`${dayOfWeekName(d)}`}</Text>
                <Text style={monthStyle}>{`${monthName(d)} ${dayOfMonth(d)}`}</Text>
                {
                    dayNumber === currentDayNumber() && (
                        <Text style={todayStyle}>{`Today`}</Text>
                    )
                }
            </View>
        </TouchableHighlight>
    );
}


const DayBoxes = ({ items, onDeleteItem, onAddItem }) => {
    const dayNumbers = [];
    for (let d = -7; d < 14; d++) {
        dayNumbers.push(currentDayNumber() + d);
    }
    const boxHeight = 100;
    const boxSpacing = 10;

    const [scrolledToDayNumber, setScrolledToDayNumber] = useState(null);
    const [height, setHeight] = useState(null);

    const scrollViewRef = useRef()
    useEffect(() => {
        if (!height) return;
        const doScrollToDayNumber = (dayNumber) => {
            let index = -1;
            for (let i = 0; i < dayNumbers.length; i++) {
                if (dayNumbers[i] === dayNumber) {
                    index = i;
                }
            }
            if (index >= 0) {
                if (scrollViewRef.current) {
                    setScrolledToDayNumber(dayNumber);
                    scrollViewRef.current.scrollTo({ y: index * (boxHeight + boxSpacing) })
                }
            }
        }
        if (scrolledToDayNumber !== currentDayNumber()) {
            doScrollToDayNumber(currentDayNumber())
        }
    })

    return (
        <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            onLayout={evt => setHeight(evt.nativeEvent.layout.height)}
        >
            {
                dayNumbers.map(dayNumber => (
                    <DayBox
                        key={dayNumber}
                        dayNumber={dayNumber}
                        boxHeight={boxHeight}
                        boxSpacing={boxSpacing}
                        onAddItem={onAddItem}
                        onDeleteItem={onDeleteItem}
                        items={items}
                    />
                ))
            }
        </ScrollView>
    )
}

export default DayBoxes;