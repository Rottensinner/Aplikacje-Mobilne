import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';
import styles from './profile.style';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkExistingUser();
    getUsernameFromStorage();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
        setUsername(parsedData.username); // Ustawienie username w stanie komponentu
      } else {
        // Tutaj możesz podejmować odpowiednie działania w przypadku braku użytkownika.
        // Na przykład przekierować na ekran logowania.
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUsernameFromStorage = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      if (userName !== null) {
        // Jeśli username istnieje w AsyncStorage, możesz go wyświetlić lub wykonać inne operacje.
        console.log('Znaleziony username:', userName);
        // Ustaw nazwę użytkownika w stanie lub gdziekolwiek jest potrzebna.
        setUsername(userName);
      } else {
        // Obsłuż sytuację, gdy username nie istnieje w AsyncStorage.
        console.log('Brak username w AsyncStorage.');
      }
    } catch (error) {
      // Obsłuż błąd, jeśli wystąpił.
      console.error('Błąd podczas pobierania username z AsyncStorage:', error);
    }
  };

};
export default Profile;