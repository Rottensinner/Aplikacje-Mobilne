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

  const ClearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Jesteś pewien że chcesz usunąć zapisane dane?",
      [
        {
          text: "Nie", onPress: () => console.log("Nie")
        },
        {
          text: "Tak", onPress: () => console.log("Tak")
        },
      ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
      "DELETE",
      "Chcesz usunąć konto?",
      [
        {
          text: "Nie", onPress: () => console.log("Zostałeś dalej z nami")
        },
        {
          text: "Tak", onPress: () => console.log("Może jeszcze kiedyś wrócisz..")
        },
      ]
    )
  }
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
  useEffect(() => {
    getUsernameFromStorage();
  }, []);
  const logout = async () => {
    try {
      // Usunięcie tokena autoryzacji lub danych sesji
      await AsyncStorage.removeItem('authToken'); // Przykład dla React Native
      
      // Przekierowanie użytkownika na ekran logowania
      navigation.replace('Login'); // Przykład dla React Navigation
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };
  console.log(username);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Image
          source={require('../assets/images/space.jpg')}
          style={styles.cover}
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/profile.jpg')}
          style={styles.profile}
        />
        <Text style={styles.name}>
        {userLogin === true ? userData.username : 'jestem ziemniaczkiem'}
        </Text>
        {userLogin  ? (
          <View style={styles.loginBtn}>
            <Text style={styles.menuText}> {userData ? userData.userName : "kotek"}</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>L O G I N</Text>
            </View>
          </TouchableOpacity>
        )}

        {userLogin === true ? (
          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>Orders</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="cart"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>koszyk</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => ClearCache()}>
              <View style={styles.menuItem(0.2)}>
                <MaterialCommunityIcons
                  name="cash"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>Clear Cache</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteAccount()}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign
                  name="deleteuser"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>delete User</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
              <View style={styles.menuItem(0.2)}>
                <AntDesign
                  name="logout"
                  color={COLORS.primary}
                  size={24}
                />
                <Text style={styles.menuText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Profile;