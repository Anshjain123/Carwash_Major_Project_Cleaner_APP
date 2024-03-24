import React, { useState, useEffect, useReducer } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card } from '@rneui/base';
import storage from '../storage';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-toast-message';

const UploadImageExteriorAndInterior = ({ navigation, route }) => {


    const { car, setadded } = route.params
    // console.log("Printing car", car);


    const [allImages, setallImages] = useState([])
    const [extImages, setextImages] = useState([]);
    const [intImages, setintImages] = useState([]);
    const [extFiles, setextFiles] = useState([]);
    const [intFiles, setintFiles] = useState([]);
    const [allUrls, setallUrls] = useState([])
    const [allImagesData, setallImagesData] = useState([])
    const [progress, setprogress] = useState(0)
    const [refreshKey, setrefreshKey] = useState(0)
    const [visible, setvisible] = useState(false);
    // const navigation = useNavigation();



    const addImageExt = async () => {
        let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true
            aspect: [4, 3],
            base64: true
        })
        const uri = _image.assets[0].uri;

        let arr = extImages;
        arr.push(uri);

        setextImages(arr);

        let base = _image.assets[0].base64;

        arr = extFiles;
        arr.push(base);

        setextFiles(arr);

        setrefreshKey(refreshKey + 1);
    }


    const addImageInt = async () => {
        let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true
            aspect: [4, 3],
            base64: true
        })
        const uri = _image.assets[0].uri;

        let arr = intImages;
        arr.push(uri);

        setintImages(arr);

        let base = _image.assets[0].base64;

        arr = intFiles;
        arr.push(base);

        setintFiles(arr);

        setrefreshKey(refreshKey + 1);
    }

    const handleSubmit = async () => {

        if (intImages.length < 5 || extImages.length < 5) {

            showToastError();
            return;

        }

        
        setprogress(0.1);
        setprogress(0.2);

        setvisible(true); 
        let res = await storage.load({ key: "CleanerloginState" })

        let username = res.username
        let token = res.token;


        setprogress(0.3);
        setprogress(0.4);
        setprogress(0.5);
        // // console.log(allImages);
        // let image = "8cca9b7c-b0b5-47ab-9ae5-d85f0520064d.jpeg"; 
        // let formData = new FormData();
        // formData.append('image', image); 
        // console.log(formData);

        let body = {
            extFiles: extFiles,
            intFiles: intFiles,
            carNumber: car.carNumber
        }

        
        setprogress(0.6);
        setprogress(0.7);
        setprogress(0.8);


        res = await fetch("http://192.168.1.23:8080/cleaner/postMediaExtAndInt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        setprogress(0.9);
        setprogress(1);

        setadded(true);
        showToastSuccess();
        setvisible(false); 
        navigation.navigate("Home");

        // console.log(res); 


    }

    const showToastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: 'all images uploaded successfully!'
        });
    }

    const showToastError = () => {
        Toast.show({
            type: 'error',
            text1: 'Please upload all interior and exterior photos'
        });
    }

    console.log(intImages);
    const screenWidth = window.innerWidth; 

    return (
        <>
            <ScrollView>

                {visible && <Progress.Bar progress={progress} width={screenWidth} />}
                <Toast style={imageUploaderStyles.toast} position='bottom' />
                <View style={{ zIndex: -1 }} >
                    <View>
                        <Card>
                            <View>
                                <Text style={imageUploaderStyles.name}>Exterior Images Upload</Text>
                            </View>
                        </Card>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>

                            <View style={imageUploaderStyles.container}>
                                {
                                    extImages.length >= 0 && <Image source={{ uri: `data:image/png;base64,${extFiles[0]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageExt("1")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Left Side view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={imageUploaderStyles.container}>
                                {
                                    extImages.length >= 1 && <Image source={{ uri: `data:image/png;base64,${extFiles[1]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageExt("2")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Right side view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }} >

                            <View style={imageUploaderStyles.container}>
                                {
                                    extImages.length >= 2 && <Image source={{ uri: `data:image/png;base64,${extFiles[2]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageExt("3")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Front side view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={imageUploaderStyles.container}>
                                {
                                    extImages.length >= 3 && <Image source={{ uri: `data:image/png;base64,${extFiles[3]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageExt("4")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Back side view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={imageUploaderStyles.container}>
                            {
                                extImages.length >= 4 && <Image source={{ uri: `data:image/png;base64,${extFiles[4]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImageExt("5")} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Number plate view</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>



                    <View >
                        <Card>
                            <View>
                                <Text style={imageUploaderStyles.name}>Interior Images Upload</Text>
                            </View>
                        </Card>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>

                            <View style={imageUploaderStyles.container}>
                                {
                                    intImages.length >= 0 && <Image source={{ uri: `data:image/png;base64,${intFiles[0]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageInt("1")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Dashboard view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={imageUploaderStyles.container}>
                                {
                                    intImages.length >= 1 && <Image source={{ uri: `data:image/png;base64,${intFiles[1]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageInt("2")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Front seat view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }} >

                            <View style={imageUploaderStyles.container}>
                                {
                                    intImages.length >= 2 && <Image source={{ uri: `data:image/png;base64,${intFiles[2]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageInt("3")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Back seat view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={imageUploaderStyles.container}>
                                {
                                    intImages.length >= 3 && <Image source={{ uri: `data:image/png;base64,${intFiles[3]}}` }} style={{ width: 200, height: 200 }} />
                                }
                                <View style={imageUploaderStyles.uploadBtnContainer}>
                                    <TouchableOpacity onPress={() => addImageInt("4")} style={imageUploaderStyles.uploadBtn} >
                                        <Text>Steering view</Text>
                                        <AntDesign name="camera" size={20} color="black" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={imageUploaderStyles.container}>
                            {
                                intImages.length >= 4 && <Image source={{ uri: `data:image/png;base64,${intFiles[4]}}` }} style={{ width: 200, height: 200 }} />
                            }
                            <View style={imageUploaderStyles.uploadBtnContainer}>
                                <TouchableOpacity onPress={() => addImageInt("5")} style={imageUploaderStyles.uploadBtn} >
                                    <Text>Carpet view</Text>
                                    <AntDesign name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View style={imageUploaderStyles.uploadBtn} >
                        <Button onPress={() => handleSubmit()} >Submit</Button>
                    </View>
                </View>


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
        width: "100%",
        padding: 10
    },
    name: {
        fontSize: 16,
        marginTop: 5,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center'
    },
    toast: {
        top: 0,
        zIndex: 9999, // Ensure it's displayed on top of other components
    },
})


export default UploadImageExteriorAndInterior