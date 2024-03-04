import React, { useState, useEffect, useReducer } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/base';
import storage from '../storage';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-js';
import { Buffer } from "buffer";

const UploadImage = ({ navigation, route }) => {


    const { car, setadded } = route.params
    // console.log("Printing car", car);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    const [url1, setUrl1] = useState(null);
    const [url2, setUrl2] = useState(null);
    const [url3, setUrl3] = useState(null);
    const [url4, setUrl4] = useState(null);
    const [url5, setUrl5] = useState(null);

    const [url, seturl] = useState(null)
    const [allImages, setallImages] = useState([])
    const [allUrls, setallUrls] = useState([])
    const [allImagesData, setallImagesData] = useState([])
    const [progress, setprogress] = useState(0)
    const [refreshKey, setrefreshKey] = useState(0)

    // const navigation = useNavigation();



    const addImage = async (number) => {

        let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true
            aspect: [4, 3],
            base64: true
        })


        const uri = _image.assets[0].uri;
        // // ImagePicker.launchCamera
        



        let arr = allImages;
        // console.log(blob); 

        arr.push(uri);

        setallImages(arr);

        let base = _image.assets[0].base64; 
        

        
        arr = allImagesData; 
        arr.push(base); 

        setallImagesData(arr); 

        setrefreshKey(refreshKey + 1);
    };

    const handleSubmit = async () => {

        let res = await storage.load({ key: "CleanerloginState" })

        let username = res.username
        let token = res.token;

        // // console.log(allImages);
        // let image = "8cca9b7c-b0b5-47ab-9ae5-d85f0520064d.jpeg"; 
        // let formData = new FormData();
        // formData.append('image', image); 
        // console.log(formData);
        
        let body = {
            allImagesData:allImagesData, 
            carNumber: car.carNumber
        }
        
        res = await fetch("http://172.31.70.192:8080/cleaner/postMedia", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(body) 
        })
        setadded(true); 
        navigation.navigate("Home");

        // console.log(res); 
    }

    return (
        <>
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row' }}>

                    <View style={imageUploaderStyles.container}>
                        {
                            allImages.length >= 0 && <Image source={{ uri: `data:image/png;base64,${allImagesData[0]}}` }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage("1")} style={imageUploaderStyles.uploadBtn} >
                                <Text>Upload image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={imageUploaderStyles.container}>
                        {
                            allImages.length >= 1 && <Image source={{ uri: `data:image/png;base64,${allImagesData[1]}}` }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage("2")} style={imageUploaderStyles.uploadBtn} >
                                <Text>Upload image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }} >

                    <View style={imageUploaderStyles.container}>
                        {
                            allImages.length >= 2 && <Image source={{ uri: `data:image/png;base64,${allImagesData[2]}}` }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage("3")} style={imageUploaderStyles.uploadBtn} >
                                <Text>Upload image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={imageUploaderStyles.container}>
                        {
                            allImages.length >= 3 && <Image source={{ uri: `data:image/png;base64,${allImagesData[3]}}` }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage("4")} style={imageUploaderStyles.uploadBtn} >
                                <Text>Upload image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={imageUploaderStyles.container}>
                    {
                        allImages.length >= 4 && <Image source={{ uri: `data:image/png;base64,${allImagesData[4]}}` }} style={{ width: 200, height: 200 }} />
                    }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={() => addImage("5")} style={imageUploaderStyles.uploadBtn} >
                            <Text>Upload image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <Button onPress={() => handleSubmit()} >Submit</Button>
                {/* {<Image source={{ uri: "http://172.31.67.171:8080/getMedia/image0" }} style={{ width: 200, height: 200 }} />} */}
            </ScrollView>
        </>
    )
}



const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 200,
        width: 200,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    }
})


export default UploadImage