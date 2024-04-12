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

export default function App() {

  // const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setemail] = useState(null);


  // console.log(socket); 
  // socket.onopen = () => {
  //     console.log('WebSocket connected!'); 
  // }


  const validateToken = async () => {

    let res = await storage.load({ key: "CleanerloginState" })
    let username = res.username;
    let token = res.token;

    let response = await fetch("http://172.31.65.95:8080/cleaner/validateToken", {
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


      {!isLoggedIn && <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <NavigationContainer>

        <Stack.Navigator>


          <Stack.Screen

            name='Home'
            component={Home}
            initialParams={{ email: email, setIsLoggedIn: setIsLoggedIn }}

          // children={() => <Home email={email} navigation={navigation} />}
          />
          <Stack.Screen

            name='cardetails'
            component={CarDetails}
          // initialParams={{ email: email }}

          // children={() => <Home email={email} navigation={navigation} />}
          />
          <Stack.Screen
            name='uploadMediaExterior'
            component={UploadMediaExterior}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              ),

            })}

          // children={() => <UploadImage navigation={navigation} />}
          />

          <Stack.Screen
            name='uploadMediaExteriorAndInterior'
            component={UploadImageExteriorAndInterior}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}

          // children={() => <UploadImage navigation={navigation} />}
          />
          <Stack.Screen

            name="accountscreen"
            component={AccountScreen}
          // children={() => <ShowImage />}
          />

          <Stack.Screen

            name="address"
            component={Address}
          // children={() => <ShowImage />}
          />
          <Stack.Screen

            name="password"
            component={ChangePassword}
          // children={() => <ShowImage />}
          />
        </Stack.Navigator>
      </NavigationContainer>}
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
