import React, { useState, useEffect, useReducer } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/base';
import storage from '../storage';
import * as Progress from 'react-native-progress';
import FlashMessage, { showMessage } from "react-native-flash-message";
import Toast from 'react-native-toast-message';

const UploadMediaExterior = ({ navigation, route }) => {


    const { car, setadded } = route.params
    // console.log("Printing car", car);



    const [url, seturl] = useState(null)
    const [allImages, setallImages] = useState([])
    const [allUrls, setallUrls] = useState([])
    const [allImagesData, setallImagesData] = useState([])
    const [progress, setprogress] = useState(0)
    const [refreshKey, setrefreshKey] = useState(0)
    const [visible, setvisible] = useState(false);
    const [extFiles, setextFiles] = useState([null, null, null, null, null]); 

    // const navigation = useNavigation();





    const addImage = async (idx) => {

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        // console.log(permissionResult);


        let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            // allowsEditing: true
            aspect: [4, 3],
            base64: true,
            zIndex: -1,
        })    
        
        if(_image.assets == null) return; 

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

        arr = extFiles; 
        arr[idx] = base; 
        setextFiles(arr); 

        setrefreshKey(refreshKey + 1);
    };

    const handleSubmit = async () => {

        
        
        setprogress(0.1);
        setprogress(0.2);
        if (allImages.length < 5) {

            showToastError();
            return;
        }

        setprogress(0.3);
        setprogress(0.4);
        setprogress(0.5);

        let res = await storage.load({ key: "CleanerloginState" })

        let username = res.username
        let token = res.token;


        setprogress(0.6);
        setprogress(0.7);
        

        setvisible(true);

   
        let body = {
            allImagesData: allImagesData,
            carNumber: car.carNumber
        }

        setprogress(0.8);

        res = await fetch("http://192.168.1.23:8080/cleaner/postMedia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        setprogress(0.9);
        setprogress(1);

        setvisible(false);

        setadded(true);

        navigation.navigate("Home");

        // console.log(res); 
    }

    const showError = () => {

        showMessage({
            message: "Please upload all photos",
            type: "danger",
            position: "top",
            duration: 3000, // 3 seconds
        });
    };


    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'all iamges uploaded successfully'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Please upload all Photos'
        });
    }

    const screenWidth = window.innerWidth; 

    console.log(extFiles); 
    return (
        <>
            <ScrollView>

                {visible && <Progress.Bar progress={progress} style={{width:"100vw"}} />}
                <Toast style={{ zIndex: 1 }} position='top' />
                <View >
                    <View style={{ display: 'flex', flexDirection: 'row', zIndex: -1 }}>

                        <View style={imageUploaderStyles.container}>
                            {
                                extFiles[0] != null && <Image source={{ uri: `data:image/png;base64,${extFiles[0]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImage(0)} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Left side view</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={imageUploaderStyles.container}>
                            {
                                extFiles[1] != null && <Image source={{ uri: `data:image/png;base64,${extFiles[1]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImage(1)} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Right side View</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row' }} >

                        <View style={imageUploaderStyles.container}>
                            {
                                extFiles[2] != null && <Image source={{ uri: `data:image/png;base64,${extFiles[2]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImage(2)} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Front view</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={imageUploaderStyles.container}>
                            {
                                extFiles[3] != null && <Image source={{ uri: `data:image/png;base64,${extFiles[3]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImage(3)} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Back view</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={imageUploaderStyles.container}>
                        {
                            extFiles[4] != null && <Image source={{ uri: `data:image/png;base64,${extFiles[4]}}` }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={() => addImage(4)} style={imageUploaderStyles.uploadBtn} >
                                <Text>Number plate view</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={imageUploaderStyles.uploadBtn} >
                        <Button onPress={() => handleSubmit()} >Submit</Button>
                    </View>
                    {/* <Button onPress={() => handleClear()} > Clear</Button> */}
                </View>


                {/* {visible && <Progress.Pie progress={progress} size={50} />} */}

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
        justifyContent: 'center',
        padding:10
    }

})


export default UploadMediaExterior