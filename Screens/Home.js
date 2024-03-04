import { View, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react'
import { Text, Card, Button, Icon } from '@rneui/themed';
import storage from '../storage';




const Home = ({ route, navigation }) => {



    const reducer = (state, action) => {
        // console.log(action);
        // state.username = action.username;
        return action.username; 
    }

    const { email, flag } = route.params;
    const [allAssignedCars, setallAssignedCars] = useState(null);
    const [username, setusername] = useState(null); 
    const [token, settoken] = useState("")
    const [added, setadded] = useState(false);
    const [allWashedCarsToday, setallWashedCarsToday] = useState([]);
    // const navigation = useNavigation();
    // const [username, dispatch] = useReducer(reducer, '');

    const getCarWashedToday = async () => {
        
        let res = await storage.load({key: "CleanerloginState"})
    
        let token = res.token; 

        res = await fetch("http://172.31.70.192:8080/getCarWashedToday", {
            method:"GET",
            headers: {
                'Content-Type': 'application/json', 
                "Authorization" : `Bearer ${token}`            
            } 
        })
        try {
            const response = await res.json();
            console.log(response);
            setallWashedCarsToday(response);
        } catch (error) {
            console.log(res.status);
            console.log(error); 
        }
    }

    


    const getUsername = async () => {
        
        
        
        // await storage.load({ key: "" })
        //     .then(ret => {
        //         // console.log(ret); 
        //         setusername(ret["username"]);
        //         settoken(ret["jwtToken"]);
        //         // return ret["username"];
        //     }).catch(err => {
        //         console.log(err);
        //     })
    }

    const getData = async () => {

        // getUsername();

        let res = await storage.load({key: "CleanerloginState"})
    
        let username = res.username
        let token = res.token; 
        settoken(token);
        // console.log(res);

        // console.log("printing token") ;

        try {
            let res = await fetch(`http://172.31.70.192:8080/cleaner/getAllCleanerCars/${username}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json', 
                    "Authorization" : `Bearer ${token}`            
                } 
                
            })

            try {
                let response = await res.json();
                console.log(response)
                setallAssignedCars(response);
                
            } catch (error) {
                console.log("problem converting res to res.json in getData in Home"); 
            }
    
        } catch (error) {
            console.log("error in home in retrieving all cleaners assigned cars!");
            console.log(error); 
        }
        
        
        
    }
    
    
    useEffect(() => {
        
        
        getData();
        getCarWashedToday();
    }, []);

    // console.log(allAssignedCars)
    // console.log(props.email);

    const handleAddMedia = (car) => {
        console.log("Adding car media to user");
        
        navigation.navigate("uploadMedia", { car: car, setadded:setadded  });
        
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* <Card.Title>Welcome {props.email}</Card.Title> */}
                    {allAssignedCars && allAssignedCars.map((car, i) => {
                        return <View key={i}>

                            <Card>
                                <View>
                                    <Text style={styles.name}>CarModel - {car.carModel}</Text>
                                    <Text style={styles.name}>CaNumber - {car.carNumber}</Text>
                                    <Text style={styles.name}>Description - {car.description}</Text>
                                </View>

                                <View>
                                    <Button disabled={(added == true || allWashedCarsToday.includes(car.carNumber) == true) ? true : false} onPress={() => handleAddMedia(car)}  >Add media</Button>
                                </View>
                            </Card>


                        </View>

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
        justifyContent: 'space-around'

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