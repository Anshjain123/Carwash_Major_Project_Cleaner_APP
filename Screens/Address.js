import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Card, Button } from '@rneui/themed'
import storage from '../storage'
import Toast from 'react-native-toast-message'

const Address = ({ navigation, route }) => {
    const host = "172.31.65.239";
    useLayoutEffect(() => {

        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            ),
            title: "Address",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const [currentAddress, setcurrentAddress] = useState("");
    const [PermanentAddress, setPermanentAddress] = useState("");

    const [orgCurrAddr, setorgCurrAddr] = useState("");
    const [orgPermCurrAddr, setorgPermCurrAddr] = useState("");

    const currentAddressRef = useRef(null);
    const permanentAddressRef = useRef(null);
    const handleReset = () => {
        setcurrentAddress(orgCurrAddr);
        setPermanentAddress(orgPermCurrAddr);
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
    const handleApplyChanges = async () => {
        let res = await storage.load({ key: "CleanerloginState" })
        let username = res.username;
        let token = res.token;

        let body = {
            username:username, 
            currentAddress:currentAddress, 
            permanentAddress: PermanentAddress
        }

        try {
            let response = await fetch(`http://${host}:8080/cleaner/updateAddress`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            // console.log(response);

            if (response.status == 200) {
                showToastSuccess();
            } else {
                showToastError();
            }

            // try {
            //     let res = await response.json();
            //     console.log(res);
            // } catch (error) {
            //     console.log("error in converting response to json");
            // }

        } catch (error) {
            console.log(error);
        }
    }


    const getCleanerAddress = async () => {

        let res = await storage.load({ key: "CleanerloginState" })

        let token = res.token;
        let username = res.username;

        // console.log(token, username);

        let response = await fetch(`http://${host}:8080/cleaner/getCleanerAddress/${username}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        try {
            const res = await response.json();
            console.log(res);
            setcurrentAddress(res.currAdd);
            setPermanentAddress(res.permanentAdd);

            setorgCurrAddr(res.currAdd);
            setorgPermCurrAddr(res.permanentAdd);
        } catch (error) {
            console.log(response.status);
            console.log(error);
        }
    }

    useEffect(() => {
        getCleanerAddress();
    }, [navigation])

    return (
        <View>
            <Toast style={{ zIndex: 1 }} position='top' />

            <View style={{ zIndex: -1 }} >


                <Card>
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >

                            <Text style={styles.name}>Current Address - </Text>
                            <TextInput defaultValue={currentAddress} ref={currentAddressRef} onChangeText={(currentAddress) => setcurrentAddress(currentAddress)} />
                        </View>
                        <TouchableOpacity onPress={() => currentAddressRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                </Card>

                <Card>
                    <View style={styles.user} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.name}>Permanent Address - </Text>
                            <TextInput defaultValue={PermanentAddress} ref={permanentAddressRef} onChangeText={(permanentAddress) => setPermanentAddress(permanentAddress)} />
                        </View>
                        <TouchableOpacity onPress={() => permanentAddressRef.current.focus()}>
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </Card>

            </View>
            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleApplyChanges()} >Apply Changes</Button>
            </View>
            <TouchableOpacity style={{ padding: 15 }}>
                <Button onPress={() => handleReset()} style={styles.btn}>Reset Changes</Button>
            </TouchableOpacity>


        </View>
    )
}

export default Address

const styles = StyleSheet.create({
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
        justifyContent: 'space-between',

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