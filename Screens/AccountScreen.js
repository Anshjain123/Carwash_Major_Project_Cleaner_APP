import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Card, Button } from '@rneui/base';

const AccountScreen = ({ navigation, route }) => {
    const { setIsLoggedIn } = route.params;
    useLayoutEffect(() => {

        navigation.setOptions({

            title: "Account settings",
            headerStyle: { backgroundColor: 'white' },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerTitleAlign: 'center',
        })
    }, [])

    const handleLogout = async () => {

        try {
            const key = "CleanerloginState";
            setIsLoggedIn(false);
            storage.remove({ key: key })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>

            <Card>
                <View style={styles.user} >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} >
                        <Text>
                            Address
                        </Text>
                    </View>
                </View>
            </Card>

            <Card>
                <View style={styles.user} >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} >
                        <Text>
                            Change Password
                        </Text>
                    </View>
                </View>
            </Card>


            <View style={{ padding: 15 }}>
                <Button style={styles.btn} onPress={() => handleLogout()} color="red" >Logout</Button>
            </View>

        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        marginBottom: 6,
        justifyContent: 'space-between',
        width: '100%'
    },
    btn: {
        width: '100%',

    }
})