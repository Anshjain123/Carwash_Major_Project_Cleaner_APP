import React, { useState, useEffect, useReducer } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchCameraAsync } from 'expo-image-picker';
import { Button } from '@rneui/base';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";



const UploadImage = ({ navigation, route }) => {

    // const reducer = (prevState, action) => {
    //     let array;

    //     arr = [...prevState];
    //     arr.push(action.payload);

    //     return arr;
    // }

    // const [allImages, dispatch] = useReducer(reducer, [])

    const { car } = route.params
    // console.log("Printing car", car);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    const [url, seturl] = useState(null)
    const [allImages, setallImages] = useState([])
    const [allUrls, setallUrls] = useState([])
    // const navigation = useNavigation();

    // useEffect(() => {

    // }, [])

    const addImage = async (number) => {


        let _image = await launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        // console.log(_image.assets[0].uri);

        if (number == 1) {
            setImage1(_image.assets[0].uri)
        } else if (number == 2) {
            setImage2(_image.assets[0].uri)
        } else if (number == 3) {
            setImage3(_image.assets[0].uri)
        } else if (number == 4) {
            setImage4(_image.assets[0].uri)
        } else {
            setImage5(_image.assets[0].uri)
        }



        // setallImages([...allImages, image]);
        let arr = allImages;
        arr.push(_image.assets[0].uri);

        // dispatch({
        //     payload: _image.assets[0].uri
        // })
        setallImages(arr);
        // console.log("printing all images", allImages[0]);
        // console.log("Printing image uri", image)


        // / image has these properties the above _image -> 

        // {
        //     "cancelled":false,
        //     "width":1080,
        //     "type":"image",
        //     "uri":"file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.5-react-expo-image-picker-guide/ImagePicker/a590d059-f144-45fe-ba8e-fc26b3c40aee.jpg",
        //     "he

    };

    const handleSubmit = () => {


        allImages.map((image, index) => {
            const storage = getStorage();
            var storagePath = `images/${car.id}/${car.carNumber}/${index}`;

            //     const storage = getStorage();
            // var storagePath = "uploads/" + selectedFile.name;
            const storageRef = ref(storage, storagePath);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("upload is " + prog + '% done');
                if (prog === 100) {
                    toast.success("Your File has been successfully uploaded");
                }
            }, (error) => {
                console.log(error);
            }, async () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                    // console.log("File Available at" + downloadUrl);
                    seturl(downloadUrl);
                    setallUrls([...allUrls, downloadUrl]);
                    // console.log("Printing URL", url);
                    navigation.navigate('showimage', { url: downloadUrl })
                })
            })
        })
    }

    return (
        <>
            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={imageUploaderStyles.container}>
                        {
                            image1 && <Image source={{ uri: image1 }} style={{ width: 200, height: 200 }} />
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
                            image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />
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
                            image3 && <Image source={{ uri: image3 }} style={{ width: 200, height: 200 }} />
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
                            image4 && <Image source={{ uri: image4 }} style={{ width: 200, height: 200 }} />
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
                        image5 && <Image source={{ uri: image5 }} style={{ width: 200, height: 200 }} />
                    }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={() => addImage("5")} style={imageUploaderStyles.uploadBtn} >
                            <Text>Upload image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>
                <Button onPress={() => handleSubmit()} >Submit</Button>
                {/* {url != null && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />} */}
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