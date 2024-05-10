import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import CarDetails from './CarDetails';
import { Ionicons } from '@expo/vector-icons';


const Home = ({ route, navigation }) => {

    const host = "172.31.66.127";



    const { email, flag, setIsLoggedIn } = route.params;
    const [allAssignedCars, setallAssignedCars] = useState(null);
    const [username, setusername] = useState(null);
    const [token, settoken] = useState("")
    const [added, setadded] = useState(false);
    const [allWashedCarsToday, setallWashedCarsToday] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    const [confirmModal, setconfirmModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);



    const getCarWashedToday = async () => {

        let res = await storage.load({ key: "CleanerloginState" })

        let token = res.token;

        res = await fetch(`http://${host}:8080/getCarWashedToday`, {
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
            headerLeft: () => (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <TouchableOpacity onPress={() => handlegetData()} >
                        <AntDesign name="reload1" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="settings-sharp" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
            title: "Home",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])



    const data1 = [
        { label: 'Exterior car wash', value: 'exterior' },
        { label: 'Interior and Exterior car wash', value: 'interior' }
    ];

    const data2 = [
        { label: 'Exterior car wash', value: 'exterior' },
        { label: 'Interior and Exterior car wash', value: 'interior' }
    ];

    const data3 = [
        { label: 'Exterior car wash', value: 'exterior' },
        { label: 'Interior and Exterior car wash', value: 'interior' }
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
            let res = await fetch(`http://${host}:8080/cleaner/getAllCleanerCars/${username}`, {
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
        setModalVisible(false);
    }, [navigation]);

    
    const handleAddress = () => {
        setModalVisible(false); 
        navigation.navigate("address");
    }
    
    const handlePassword = () => {
        setModalVisible(false);
        navigation.navigate("password", { setIsLoggedIn: setIsLoggedIn })
    }
    
    const handleConfirm = () => {
        setModalVisible(false);
        setconfirmModal(true);
    }
    
    const handleLogout = async () => {
        
        try {
            const key = "CleanerloginState";
            setIsLoggedIn(false);
            storage.remove({ key: key })
        } catch (error) {
            console.log(error);
        }
    }
    console.log(modalVisible);
    
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

                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View>

                                    <TouchableOpacity onPress={() => handleAddress()} style={styles.user} >
                                        <Text style={{ fontSize: 16 }} >
                                            Address
                                        </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handlePassword()} style={styles.user} >
                                        <Text style={{ fontSize: 16 }}>
                                            Change Password
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleConfirm()} style={styles.user} >
                                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }} >
                                            Logout
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {/* <Text style={styles.modalText}>This is the modal content</Text> */}
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </Modal>
                </View>

                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={confirmModal}
                        onRequestClose={() => {
                            setconfirmModal(!confirmModal);
                        }}

                    >
                        <View style={styles.confirmCenteredView}>
                            <View style={styles.modalView}>
                                <View>

                                    <Text style={{ padding: 10, textAlign: 'center' }} >Are you sure to logout</Text>
                                    <View style={{ marginBottom: 10 }} >

                                        <Button color="red" title="Ok" onPress={() => handleLogout()} />
                                    </View>
                                    <View>

                                        <Button title="Cancel" onPress={() => setconfirmModal(false)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
        // flexDirection: 'row',
        marginBottom:15
        // justifyContent: 'space-around'

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
    centeredView: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection:'row'
        // marginTop: 22,
    },
    confirmCenteredView: {
        flex: 1,
        // flexDirection: "row",
        padding: 20,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-start'
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection:'row'
        marginTop: 22,
    },
    modalView: {
        marginTop: 30,

        backgroundColor: 'white',
        borderRadius: 20,
        // width: '90%',
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 50

    },

});

export default Home