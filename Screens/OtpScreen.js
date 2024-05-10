import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@rneui/base';
// import { OTPTextInput } from 'react-native-otp-textinput';
// OTPTextView
// import OtpInputs from 'react-native-otp-inputs';



const OtpScreen = ({ navigation, route }) => {

  const host = "172.31.66.127";

  const { username, setIsLoggedIn } = route.params;
  const [seconds, setSeconds] = useState(30);
  const [otp, setotp] = useState("");

  const getOtp = async () => {
    try {

      let res = await fetch(`http://${host}:8080/login/cleaner/getotp/${username}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      try {
        // const response = await res.json();
        // console.log(response);
        // console.log(res);

        // if (res.status == 302) {
        //   // found 
        //   // navigation.
        //   navigation.navigate("otpscreen", { username: username, setIsLoggedIn: setIsLoggedIn });
        // }
      } catch (error) {
        console.log(res.status);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOtp();

  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Clean up the timer when the component unmounts or when seconds reach 0
    return () => clearInterval(intervalId);
  }, [])
  const handleGetOtp = async () => {
    setSeconds(30);
    getOtp();
  }

  const handleSubmit = async () => {

    try {

      let res = await fetch(`http://${host}:8080/login/cleaner/validateOtp`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp, username: username })
      })
      try {
        // const response = await res.json();
        // console.log(response);
        // console.log(res);

        if (res.status == 200) {
          // found 
          // navigation.
          navigation.navigate("newpassword", { username: username, setIsLoggedIn: setIsLoggedIn });
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
    <View style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }} >

      <View style={styles.inputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Otp"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(otp) => setotp(otp)}
        />
      </View>
      {seconds > 0 && <View style={{ alignItems: 'center', paddingBottom: 15 }}>
        <Text style={{ fontSize: 14, color: 'gray' }}>Resend otp in: {seconds} seconds</Text>
      </View>}
      {seconds <= 0 && <TouchableOpacity style={{ alignItems: 'center', paddingBottom: 15 }}>
        <Text disabled={seconds > 0 ? true : false} style={{ color: '#668DB1' }} onPress={() => handleGetOtp()} >Resend Otp</Text>
      </TouchableOpacity>}
      <View>

        <Button onPress={() => handleSubmit()} >Submit</Button>
      </View>
    </View>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  TextInput: {
    height: 500,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    // backgroundColor: "#FFC0CB",
    // borderRadius: 30,
    width: "50%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    display: 'flex',
    borderBottomWidth: 0.5

  },
})