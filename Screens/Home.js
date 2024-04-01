import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import CarDetails from './CarDetails';



const Home = ({ route, navigation }) => {




    const { email, flag } = route.params;
    const [allAssignedCars, setallAssignedCars] = useState(null);
    const [username, setusername] = useState(null);
    const [token, settoken] = useState("")
    const [added, setadded] = useState(false);
    const [allWashedCarsToday, setallWashedCarsToday] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const getCarWashedToday = async () => {

        let res = await storage.load({ key: "CleanerloginState" })

        let token = res.token;

        res = await fetch("http://192.168.1.23:8080/getCarWashedToday", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        try {
            const response = await res.json();
            console.log(response);
            setallWashedCarsToday(response);
        } catch (error) {
            console.log(res.status);
            console.log(error);
        }
    }


    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    {/* Dropdown label */}
                </Text>
            );
        }
        return null;
    };

    const handlegetData = () => {
        getData();
        getCarWashedToday();
    }
    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <TouchableOpacity onPress={() => handlegetData()} >
                        <AntDesign name="reload1" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])



    const data1 = [
        { label: 'Exterior car wash', value: 'exterior'},
        { label: 'Interior and Exterior car wash', value: 'interior'}
    ];

    const data2 = [
        { label: 'Exterior car wash', value: 'exterior'},
        { label: 'Interior and Exterior car wash', value: 'interior'}
    ];

    const data3 = [
        { label: 'Exterior car wash', value: 'exterior'},
        { label: 'Interior and Exterior car wash', value: 'interior'}
    ];




    const getData = async () => {

        // getUsername();

        let res = await storage.load({ key: "CleanerloginState" })

        let username = res.username
        let token = res.token;
        settoken(token);
        // console.log(res);

        // console.log("printing token") ;

        try {
            let res = await fetch(`http://192.168.1.23:8080/cleaner/getAllCleanerCars/${username}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }

            })

            try {
                let response = await res.json();
                console.log(response)
                setallAssignedCars(response);

            } catch (error) {
                console.log("problem converting res to res.json in getData in Home");
            }

        } catch (error) {
            console.log("error in home in retrieving all cleaners assigned cars!");
            console.log(error);
        }
    }
    useEffect(() => {

        getData();
        getCarWashedToday();
    }, []);




    return (
        <>
            <ScrollView>
                {/* <Progress.Bar progress={0.3} style={{ width: "100vw" }} /> */}
                {renderLabel()}
                <Toast style={{ zIndex: 1 }} position='top' />
                <View style={styles.container}>
                    {allAssignedCars && allAssignedCars.map((car, i) => {
                        return <CarDetails key={car.carNumber} car={car} data={data1} allWashedCarsToday={allWashedCarsToday} navigation={navigation} />


                    })}

                </View>

                {/* {allAssignedCars && <CarDetails key={allAssignedCars[0].carNumber} car={allAssignedCars} data={data1} allWashedCarsToday={allWashedCarsToday} />}
                {allAssignedCars && <CarDetails key={allAssignedCars[1].carNumber} car={allAssignedCars} data={data1} allWashedCarsToday={allWashedCarsToday} />}
                {allAssignedCars && <CarDetails key={allAssignedCars[2].carNumber} car={allAssignedCars} data={data1} allWashedCarsToday={allWashedCarsToday} />} */}
            </ScrollView>
        </>
    )
}

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
});

export default Home










// const users = [
//     {
//         name: 'brynn',
//         avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
//     },
//     {
//         name: 'thot leader',
//         avatar:
//             'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
//     },
//     {
//         name: 'jsa',
//         avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
//     },
//     {
//         name: 'talhaconcepts',
//         avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
//     },
//     {
//         name: 'andy vitale',
//         avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
//     },
//     {
//         name: 'katy friedson',
//         avatar:
//             'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
//     },
// ];