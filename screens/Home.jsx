import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from './home.style';
import Welcome from '../components/home/Welcome';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    // Stan przechowujący dane użytkownika
    const [userData, setUserData] = useState(null);
    // Stan wskazujący, czy użytkownik jest zalogowany
    const [userLogin, setUserLogin] = useState(false);

    // Efekt pobierający dane użytkownika przy montażu komponentu
    useEffect(() => {
        checkExistingUser();
    }, []);

    // Funkcja sprawdzająca istnienie użytkownika w AsyncStorage
    const checkExistingUser = async () => {
        const id = await AsyncStorage.getItem('id');
        const useId = `users${JSON.parse(id)}`;

        try {
            // Pobierz dane użytkownika z AsyncStorage
            const currentUser = await AsyncStorage.getItem(useId);

            if (currentUser !== null) {
                const parsedData = JSON.parse(currentUser);
                // Ustaw dane użytkownika w stanie i wskazanie, że użytkownik jest zalogowany
                setUserData(parsedData);
                setUserLogin(true);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {/* AppBar */}
                <View style={styles.appBarWrapper}>
                    <View style={styles.appBar}>
                        <View>
                            {/* Licznik koszyka */}
                            <View style={styles.cartCount}>
                                <Text style={styles.cartNumber}>8</Text>
                            </View>
                            {/* Ikona koszyka */}
                            <TouchableOpacity>
                                <Fontisto name='shopping-bag' size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Treść ekranu */}
                <View style={{ marginBottom: 82 }}>
                    {/* Komponent powitalny */}
                    <Welcome />

                    {/* Komponent karuzeli */}
                    <Carousel />

                    {/* Komponent nagłówków */}
                    <Headings />

                    {/* Komponent listy produktów */}
                    <ProductRow />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
