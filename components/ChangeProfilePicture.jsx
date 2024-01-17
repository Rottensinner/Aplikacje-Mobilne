import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const ChangeProfilePicture = ({ onImageSelected }) => {
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
      <TouchableOpacity onPress={takePhotoAndUpdate} style={styles.buttonContainer}>
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
