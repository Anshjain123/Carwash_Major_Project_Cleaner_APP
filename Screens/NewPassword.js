import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Card } from '@rneui/base'

const NewPassword = ({ navigation, route }) => {

    const host = "172.31.65.218";

    const { setIsLoggedIn, username } = route.params;

    useLayoutEffect(() => {

        navigation.setOptions({

            title: "New Password",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const [newPassword, setnewPassword] = useState("");

    const handleSubmit = async () => {
        try {

            let res = await fetch(`http://${host}:8080/login/changePassword`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: newPassword, username: username })
            })
            try {
                // const response = await res.json();
                // console.log(response);
                // console.log(res);

                if (res.status == 200) {
                    // found 
                    // navigation.
                    // setIsLoggedIn(true);
                    navigation.navigate("login")
                }
            } catch (error) {
                console.log(res.status);
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>

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

export default NewPassword

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