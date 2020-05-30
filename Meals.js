import React, { useEffect, useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import Screen from './Screen';
import { addMealItem, deleteMealItem } from './actions';
import DayBoxes from './DayBoxes'
import { randomString } from './randomString'
import { dayNumberToDate } from './dayNumber';

const Meals = ({ generalSettings, mealItems, navigation, onAddMealItem, onDeleteMealItem }) => {
    const handleAddItem = ({dayNumber, text}) => {
        if (text) {
            onAddMealItem({
                id: randomString(10),
                dayNumber: dayNumber,
                label: text
            })
        }
    }

    const handleDeleteItem = (item) => {
        onDeleteMealItem(item.id);
    }

    return (
        <Screen screenName="Meals" navigation={navigation}>
            <DayBoxes
                onAddItem={({dayNumber, text}) => handleAddItem({dayNumber, text})}
                items={mealItems}
                onDeleteItem={item => handleDeleteItem(item)}
            />
        </Screen>
    )
}

const mapStateToProps = state => {
    return {
        generalSettings: state.generalSettings,
        mealItems: state.mealItems
    }
}

const mapDispatchToProps = dispatch => ({
    onAddMealItem: (item) => dispatch(addMealItem(item)),
    onDeleteMealItem: (id) => dispatch(deleteMealItem(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Meals)