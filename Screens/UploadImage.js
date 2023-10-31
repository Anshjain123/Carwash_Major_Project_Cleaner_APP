import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, Input } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchCameraAsync } from 'expo-image-picker';
import { Button } from '@rneui/base';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


const UploadImage = ({ navigation }) => {


    const [image, setImage] = useState(null);
    const [url, seturl] = useState(null)
    
    // const navigation = useNavigation();

    // useEffect(() => {

    // }, [])

    const addImage = async () => {


        let _image = await launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(_image.assets[0].uri);

        setImage(_image.assets[0].uri)

        console.log("Printing image uri", image);


        // / image has these properties the above _image -> 

        // {
        //     "cancelled":false,
        //     "width":1080,
        //     "type":"image",
        //     "uri":"file:///data/user/0/host.exp.exponent/cache/ExperienceData/UNVERIFIED-192.168.1.5-react-expo-image-picker-guide/ImagePicker/a590d059-f144-45fe-ba8e-fc26b3c40aee.jpg",
        //     "he

    };

    const handleSubmit = () => {
        const storage = getStorage();
        var storagePath = "images/1";

        //     const storage = getStorage();
        // var storagePath = "uploads/" + selectedFile.name;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + prog + '% done');
            if (prog === 100) {
                toast.success("Your File has been successfully uploaded");
            }
        }, (error) => {
            console.log(error);
        }, async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                console.log("File Available at" + downloadUrl);
                seturl(downloadUrl);
                console.log("Printing URL", url)
                navigation.navigate('showimage', { url: downloadUrl })
            })
        })

    }

    return (
        <View>
            <View style={imageUploaderStyles.container}>
                {
                    image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                <View style={imageUploaderStyles.uploadBtnContainer}>
                    <TouchableOpacity onPress={() => addImage()} style={imageUploaderStyles.uploadBtn} >
                        <Text>Upload image</Text>
                        <AntDesign name="camera" size={20} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
            <Button onPress={() => handleSubmit()} >Submit</Button>
            {/* {url != null && <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />} */}
        </View>
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