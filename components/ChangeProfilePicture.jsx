import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
<<<<<<< HEAD
=======
import { PermissionsAndroid } from 'react-native';
>>>>>>> e49ac4d154c2389b25d3e0e9301c0701650a8eab

const ChangeProfilePicture = ({ onImageSelected }) => {
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        takePhotoAndUpdate();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoAndUpdate = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        onImageSelected(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={checkCameraPermission} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Zrób i zmień zdjęcie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeProfilePicture;

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

