import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowImage from './Screens/ShowImage';
import { AntDesign } from '@expo/vector-icons';
import UploadMediaExterior from './Screens/UploadImageExterior';
import UploadImageExteriorAndInterior from './Screens/UploadImageExteriorAndInterior';
import CarDetails from './Screens/CarDetails';
import storage from './storage';
import AccountScreen from './Screens/AccountScreen';
import Address from './Screens/Address';
import ChangePassword from './Screens/ChangePassword';
import ForgetPassword from './Screens/ForgetPassword';
import OtpScreen from './Screens/OtpScreen';
import NewPassword from './Screens/NewPassword';


export default function App() {

  // const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setemail] = useState(null);
  const host = "172.31.66.127";


  // console.log(socket); 
  // socket.onopen = () => {
  //     console.log('WebSocket connected!'); 
  // }


  const validateToken = async () => {


    let res = await storage.load({ key: "CleanerloginState" })
    let username = res.username;
    let token = res.token;

    let response = await fetch(`http://${host}:8080/cleaner/validateToken`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (response.ok) {
      setIsLoggedIn(true);
    }


  }

  useEffect(() => {

    validateToken();

  }, [])

  const Stack = createNativeStackNavigator();
  console.log(email, "EMAIl");
  return (

    <>


      {/* {!isLoggedIn && <LoginScreen setIsLoggedIn={setIsLoggedIn} />} */}
      <NavigationContainer

      >

        <Stack.Navigator>


          {isLoggedIn && <Stack.Screen

            name='Home'
            component={Home}
            initialParams={{ email: email, setIsLoggedIn: setIsLoggedIn }}

          // children={() => <Home email={email} navigation={navigation} />}
          />}
          {isLoggedIn && <Stack.Screen

            name='cardetails'
            component={CarDetails}
          // initialParams={{ email: email }}

          // children={() => <Home email={email} navigation={navigation} />}
          />}
          {isLoggedIn && <Stack.Screen
            name='uploadMediaExterior'
            component={UploadMediaExterior}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              ),

            })}

          />}

          {isLoggedIn && <Stack.Screen
            name='uploadMediaExteriorAndInterior'
            component={UploadImageExteriorAndInterior}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}

          />}
          {isLoggedIn && <Stack.Screen

            name="accountscreen"
            component={AccountScreen}
          />
          }
          {isLoggedIn && <Stack.Screen

            name="address"
            component={Address}
          // children={() => <ShowImage />}
          />}
          {isLoggedIn && <Stack.Screen

            name="password"
            component={ChangePassword}
          // children={() => <ShowImage />}
          />}
          {isLoggedIn == false && <Stack.Screen

            name="login"
            component={LoginScreen}
            setIsLoggedIn={setIsLoggedIn}
            initialParams={{ setIsLoggedIn: setIsLoggedIn }}
          />}
          {isLoggedIn == false && <Stack.Screen

            name="forgetpassword"
            component={ForgetPassword}

          />}
          {isLoggedIn == false && <Stack.Screen

            name="otpscreen"
            component={OtpScreen}

          />}
          {isLoggedIn == false && <Stack.Screen

            name="newpassword"
            component={NewPassword}

          />}
        </Stack.Navigator>
      </NavigationContainer>
    </>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
