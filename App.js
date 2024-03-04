import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import { useEffect, useState } from 'react';
import UploadImage from './Screens/UploadImage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowImage from './Screens/ShowImage';



export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setemail] = useState(null);


  // console.log(socket); 
  // socket.onopen = () => {
  //     console.log('WebSocket connected!'); 
  // }

  useEffect(() => {


  }, [])

  const Stack = createBottomTabNavigator();
  console.log(email, "EMAIl");
  return (

    <>


      {!isLoggedIn && <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <NavigationContainer>

        <Stack.Navigator>


          <Stack.Screen

            name='Home'
            component={Home}
            initialParams={{ email: email }}
          // children={() => <Home email={email} navigation={navigation} />}
          />
          <Stack.Screen
            name='uploadMedia'
            component={UploadImage}
          // children={() => <UploadImage navigation={navigation} />}
          />
          <Stack.Screen

            name="showimage"
            component={ShowImage}
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
