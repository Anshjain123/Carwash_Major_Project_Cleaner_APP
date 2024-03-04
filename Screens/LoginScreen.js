import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import storage from "../storage";
import { LogBox } from 'react-native';

const LoginScreen = ({ setIsLoggedIn, navigation }) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const storeData = async (data) => {
        console.log("trying to store jwt and user");
        try {

            storage.save({
                key: "CleanerloginState",
                data: {
                    "token": data["jwtToken"],
                    "username": data["username"]
                },
                expires: null
            })

            // storage.load({key:"loginState"})
            // .then(ret => {
            //     console.log(ret); 
            // }).catch(err => {
            //     console.log(err); 
            // }) 
        } catch (error) {
            console.log(error);
        }

    }

    const handlelogin = async () => {
        console.log("trying to login");
        // console.log(props); 

        try {

            let res = await fetch("http://172.31.70.192:8080/login/cleaner", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username: email, password: password })
            })
            if (res.ok) {
                let response = await res.json();
                console.log(response);
                storeData(response);
                setIsLoggedIn(true);
                // console.log(response["jwtToken"]);

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => handlelogin()} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});


export default LoginScreen