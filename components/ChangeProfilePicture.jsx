import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PermissionsAndroid } from 'react-native';

const ChangeProfilePicture = ({ onImageSelected }) => {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    return () => {
      // Component unmounted, setMounted to false
      setMounted(false);
    };
  }, []);

  const checkCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (mounted && granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        takePhotoAndUpdate();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoAndUpdate = async () => {
    if (mounted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const source = result.assets[0].uri;
        console.log(source);
        onImageSelected(source);
      } else {
        // User cancelled the camera action, re-request permissions
        checkCameraPermission();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={checkCameraPermission} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Zrób i zmień zdjęcie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default ChangeProfilePicture;
