import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

const initialGroceryItems = [
    {
        name: 'bananas'
    },
    {
        name: 'apples'
    },
    {
        name: 'shrimp'
    }
]

const GroceryItem = ({ item }) => {
    return (
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </View>
    )
}

const Groceries = () => {

    const [inputText, setInputText] = useState('');
    const [groceryItems, setGroceryItems] = useState(initialGroceryItems)

    const handleSubmit = (text) => {
        setGroceryItems([
            ...groceryItems,
            {
                name: text
            }
        ])
        setInputText('');
    }

    return (
        <View>
            <Text h2>Next grocery trip in {4} days!</Text>
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={groceryItems}
                    renderItem={({ item }) => <GroceryItem item={item} />}
                    keyExtractor={item => item.name}
                />
            </ScrollView>
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
    row: {
      flex: 1,
      padding: 20,
      flexDirection: 'row',
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    left: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    text: {
      color: 'purple',
      marginLeft: 10
    },
    scrollView: {
        height: 150
    }
  });

export default Groceries