import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Card } from '@rneui/base'
import storage from '../storage'
import Toast from 'react-native-toast-message';
import zIndex from '@mui/material/styles/zIndex';

const ChangePassword = ({ route, navigation }) => {
    const host = "172.31.65.239";
    const { setIsLoggedIn } = route.params;

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Change Password",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'Password Changed successfully',

        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Please type correct old password'
        });
    }


    const handleSubmit = async () => {
        // console.log("Yes")
        let res = await storage.load({ key: "CleanerloginState" })
        let username = res.username;
        let token = res.token;

        let body = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            username: username
        }

        try {
            let response = await fetch(`http://${host}:8080/cleaner/changePassword`, {
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

                try {
                    const key = "ClientloginState";
                    setIsLoggedIn(false);
                    storage.remove({ key: key })
                } catch (error) {
                    console.log("Yes");
                    console.log(error);
                }
            } else {
                // console.log('no')
                showToastError();
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View>
            <Toast style={{ zIndex: 10 }} position='top' duration={3000} />
            <View style={{ zIndex: -1 }}>

                <Card  >
                    <View style={[styles.user, { zIndex: -1 }]} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }} >

                            <TextInput
                                style={styles.TextInput}
                                placeholder="Old password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                onChangeText={(password) => setoldPassword(password)}
                            />
                        </View>

                    </View>
                </Card>
            </View>
            <View>

                <Card style={{ zIndex: -1 }}>
                    <View style={[styles.user, { zIndex: -1 }]} >
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }} >

                            {/* <Text style={styles.name}>Address Line - </Text> */}
                            <TextInput
                                style={styles.TextInput}
                                placeholder="New Password"
                                placeholderTextColor="#003f5c"
                                secureTextEntry={true}
                                // value={password}

                                onChangeText={(password) => setnewPassword(password)}
                            />
                        </View>
                    </View>
                </Card>
            </View>
            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleSubmit()} >Submit</Button>
            </View>

        </View>
    )
}

export default ChangePassword

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