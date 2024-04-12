import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const CarDetails = ({ navigation, car, allWashedCarsToday, data }) => {

    let colorPlans = {
        "plan2": "#3498db",
        "plan1": "#e74c3c",
        "plan3": "#ffd700"
    }


    console.log(data);

    const [added, setadded] = useState(false);
    // const [allWashedCarsToday, setallWashedCarsToday] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Please select type of car wash'
        });
    }

    const handleAddMedia = (car) => {
        console.log("Adding car media to user");
        if (value == null) {
            showToastError();
            return;
        }

        if (value === "exterior") {
            navigation.navigate("uploadMediaExterior", { car: car, setadded: setadded });
        } else {
            navigation.navigate("uploadMediaExteriorAndInterior", { car: car, setadded: setadded });
        }

    }


    // console.log(car.plan);

    return (

        <Card >
            <Toast position='top' style={{ zIndex: 1 }} />

            <View style={{ borderTopColor: colorPlans[car.plan], borderTopWidth: 5, zIndex: -1 }}>

                <View>
                    <Text style={styles.name}>CarModel - {car.carModel}</Text>
                    <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                    <Text style={styles.name}>Description - {car.description}</Text>
                    <Text style={styles.name}>Plan - {car.plan}</Text>
                    <Text style={styles.name}>Plan Validity - {moment(car.planValidity).utc().format("DD-MM-YYYY")}</Text>
                    <Text style={styles.name}>carLocation - {car.carLocation}</Text>
                </View>

                <View style={styles.dropdown__car__wash} >


                    <Dropdown

                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select type of car wash' : '...'}

                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />

                </View>
                <View style={styles.btnView}>
                    <Button style={styles.btn} disabled={(added == true || allWashedCarsToday.includes(car.carNumber) == true) ? true : false} onPress={() => handleAddMedia(car)}  >Add media</Button>
                </View>
            </View>
        </Card>
    )
}

export default CarDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: -1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
        justifyContent: 'space-around'

    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdown__car__wash: {
        paddingTop: 10,

    },
    btnView: {
        paddingTop: 10
    },
})