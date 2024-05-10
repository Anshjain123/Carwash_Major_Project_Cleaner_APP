import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Card, Button } from '@rneui/base';
import Toast from 'react-native-toast-message';

const ForgetPassword = ({ navigation, route }) => {
    const host = "172.31.66.127";
    const {setIsLoggedIn} = route.params;
    const [username, setusername] = useState("");

    useLayoutEffect(() => {

        navigation.setOptions({
            headerLeft: () => (
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("login")} >
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),

            title: "Forget Password",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])


    const handleSubmit = async () => {
        // console.log(username);
        // try {

        //     let res = await fetch(`http://${host}:8080/login/cleaner/getotp/${username}`, {
        //         method: "GET",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     try {
        //         // const response = await res.json();
        //         // console.log(response);
        //         // console.log(res);

        //         if (res.status == 302) {
        //             // found 
        //             // navigation.
        navigation.navigate("otpscreen", { username: username, setIsLoggedIn:setIsLoggedIn });
        //         }
        //     } catch (error) {
        //         console.log(res.status);
        //         console.log(error);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }


    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Address updated successfully'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'not able to update address please try again'
        });
    }
    return (
        <View style={{ zIndex: -1, display: 'flex' }}>
            <Toast style={{ zIndex: 1 }} position='top' />
            <View>
                <Card>
                    <View style={[styles.user, { zIndex: -1 }]} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', alignItems: 'center' }} >

                            <TextInput
                                style={styles.TextInput}
                                placeholder="enter your email"
                                placeholderTextColor="#003f5c"

                                onChangeText={(username) => setusername(username)}
                            />
                        </View>

                    </View>
                </Card>
            </View>

            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleSubmit()} >Get Otp</Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        borderWidth: 0.3,

        // marginLeft: 20,
    },
    container: {
        flex: 1,
        zIndex: -1
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
        // justifyContent: 'space-between',
        justifyContent: 'center',
        alignItems: 'center'

    },

    name: {
        // fontSize: 16,
        // marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    btn: {
        width: '100%',

    }
})
export default ForgetPassword