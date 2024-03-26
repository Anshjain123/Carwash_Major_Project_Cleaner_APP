import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


// In React Native applications, including those built with Expo, the SQLite database used by AsyncStorage on Android is not explicitly created or managed by the Expo app itself. Instead, AsyncStorage relies on the SQLite database engine provided by the Android operating system.

// When you install and run a React Native app (including Expo apps) on an Android device, the app is given its own private storage space within the device's file system. AsyncStorage uses this private storage space to create and manage a SQLite database file to store key-value pairs.

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 72,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

export default storage;