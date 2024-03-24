import { View, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';


const Home = ({ route, navigation }) => {


    const data = [
        { label: 'Exterior car wash', value: 'exterior' },
        { label: 'Interior and Exterior car wash', value: 'interior' }
    ];


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

    const getUsername = async () => {



        // await storage.load({ key: "" })
        //     .then(ret => {
        //         // console.log(ret); 
        //         setusername(ret["username"]);
        //         settoken(ret["jwtToken"]);
        //         // return ret["username"];
        //     }).catch(err => {
        //         console.log(err);
        //     })
    }

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


    const showError = () => {
        showMessage({
            message: "Please select type of car wash",
            type: "danger",
            position: "top",
            duration: 3000, // 3 seconds
        });
    };

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

    return (
        <>
            <ScrollView>
                {/* <Progress.Bar progress={0.3} style={{ width: "100vw" }} /> */}
                {renderLabel()}
                <Toast style={{ zIndex: 1 }} position='top' />
                <View style={styles.container}>
                    {/* <Card.Title>Welcome {props.email}</Card.Title> */}
                    {allAssignedCars && allAssignedCars.map((car, i) => {
                        return <View key={i}>

                            <Card >
                                <View>
                                    <Text style={styles.name}>CarModel - {car.carModel}</Text>
                                    <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                                    <Text style={styles.name}>Description - {car.description}</Text>
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
                            </Card>


                        </View>

                    })}

                </View>
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