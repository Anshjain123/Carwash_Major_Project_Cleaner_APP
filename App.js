import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import UploadImage from './Screens/UploadImage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowImage from './Screens/ShowImage';

export default function App() {

  const [loginScreen, setloginScreen] = useState(true);
  const [email, setemail] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setemail(user.email);
        setloginScreen(false);
        const uid = user.uid;
        // ...
      } else {
        setloginScreen(true);
        // User is signed out
        // ...
      }
    });

  }, [])

  const Stack = createNativeStackNavigator();
  console.log(email, "EMAIl");
  return (

    <>


      {loginScreen && <LoginScreen setloginScreen={setloginScreen} setemail={setemail} />}
      {!loginScreen && <NavigationContainer>

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
