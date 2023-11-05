import { View, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';



const Home = ({ route, navigation }) => {

    const { email } = route.params;
    const [allAssignedCars, setallAssignedCars] = useState([]);
    // const navigation = useNavigation();
    
    useEffect(() => {
        const getData = async () => {
    
            const docRef = doc(db, "cities", `${email}`)
            const docSnap = await getDoc(docRef)
    
            // console.log("debug")
            console.log("Printing DocSnap", docSnap.data());
            setallAssignedCars(docSnap.data().assignedCars);
        }


        getData();

    }, []);

    // console.log(allAssignedCars)
    // console.log(props.email);

    const handleAddMedia = (car) => {
        console.log("Adding car media to user");
        navigation.navigate("uploadMedia", { car: car });
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Card.Title>Welcome {props.email}</Card.Title> */}
                    {allAssignedCars.map((car, i) => {
                        return (
                            <Card>
                                <View key={i} style={styles.user} >
                                    {/* <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{ uri: u.avatar }}
                                    /> */}
                                    <View>
                                        <Text style={styles.name}>CarModel - {car.carModel}</Text>
                                        <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                                        <Text style={styles.name}>Description - {car.description}</Text>
                                    </View>

                                    <View>
                                        <Button onPress={() => handleAddMedia(car)} >Add media</Button>
                                    </View>

                                </View>
                            </Card>
                        );
                    })}

                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
        justifyContent: 'space-between'

    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default Home










// const users = [
//     {
//         name: 'brynn',
//         avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
//     },
//     {
//         name: 'thot leader',
//         avatar:
//             'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
//     },
//     {
//         name: 'jsa',
//         avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
//     },
//     {
//         name: 'talhaconcepts',
//         avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
//     },
//     {
//         name: 'andy vitale',
//         avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
//     },
//     {
//         name: 'katy friedson',
//         avatar:
//             'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
//     },
// ];