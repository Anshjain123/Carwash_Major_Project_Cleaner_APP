import { View, Text, Image } from 'react-native'
import React from 'react'

const ShowImage = ({ navigation, route }) => {
    const { url } = route.params;
    // console.log(url);
    // console.log("Printing routes", route
    // )
    return (
        <View>
            <Text>{url}</Text>
            <Image source={{ uri: url }} style={{ width: 200, height: 200 }} />
        </View>
    )
}

export default ShowImage