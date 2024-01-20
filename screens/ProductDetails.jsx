import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from './productDetails.style';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from '../constants';
import { useNavigation } from '@react-navigation/native';


const ProductDetails = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const [count, setCount] = useState(1);
    const [userId, setUserId] = useState(null); // Stan do przechowywania identyfikatora użytkownika

    useEffect(() => {
        // Pobierz identyfikator użytkownika z AsyncStorage przy inicjalizacji komponentu
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('id');
                console.log('Dane otrzymane:', storedUserId);

                if (storedUserId !== null) {
                    setUserId(storedUserId);
                } else {
                    // Jeśli identyfikator użytkownika nie jest dostępny w AsyncStorage, możesz obsłużyć to odpowiednio
                    console.log('Brak zapisanego identyfikatora użytkownika');
                }
            } catch (error) {
                console.error('Błąd podczas pobierania identyfikatora użytkownika z AsyncStorage', error);
            }
        };

        fetchUserId();
    }, []);

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const increment = () => {
        setCount(count + 1);
    }

    const addToCart = async (cartItem) => {
        try {
            // Tu możesz dodać logikę sprawdzającą istnienie identyfikatora koszyka, jeśli jest to wymagane
            const response = await fetch('http://10.0.2.2:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem),
            });
            console.log(cartItem);
    
            if (response.status === 200) {
                Alert.alert('Sukces', 'Produkt dodany do koszyka');
            }if (response.status !== 200) {
                const errorText = await response.text(); // Odczytanie treści błędu
                Alert.alert('Błąd', `Wystąpił błąd podczas dodawania produktu do koszyka: ${response.status} - ${errorText}`);
                console.log(response.status,errorText);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania zapytania', error);
            Alert.alert('Błąd sieci', 'Nie można połączyć się z serwerem');
        }
    }
    const handleBuyNow = () => {
        const formattedUserId = userId.replace(/"/g, ''); // Usuwa wszystkie znaki cudzysłowu z userId
    
        const cartItem = {
            userId: formattedUserId,
            cartItem: item._id,
            quantity: count,
        };
    
        console.log(cartItem.userId); // Powinno wyświetlić userId bez znaków cudzysłowu
        console.log(cartItem.cartItem);
        console.log(cartItem.quantity);
    
        // Wywołaj funkcję do dodawania produktu do koszyka
        addToCart(cartItem);
    }
    

    const handleAddToCart = () => {
        if (userId) {
            const formattedUserId = userId.replace(/"/g, ''); // Usuwa wszystkie znaki cudzysłowu z userId
    
        const cartItem = {
            userId: formattedUserId,
            cartItem: item._id,
            quantity: count,
        };
            // Wywołaj funkcję do dodawania produktu do koszyka
            addToCart(cartItem);
        } else {
            console.log('Brak zapisanego identyfikatora użytkownika');
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons
                        name='chevron-back-circle'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons
                        name='heart'
                        size={30}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={{uri: item.imageUrl}}
                style={styles.image}
            />

            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </View>

                <View style={styles.ratingRow}>
                    <View style={styles.rating}>
                        {[1,2,3,4,5].map((index) => (
                            <Ionicons
                                key={index}
                                name='star'
                                size={24}
                                color='gold'
                            /> 
                        ))}
                        
                        <Text style={styles.ratingText}>  (4.9)</Text>
                    </View>
                    
                    <View style={styles.rating}>
                        <TouchableOpacity onPress={() => decrement()}>
                            <SimpleLineIcons
                                name='minus'
                                size={20}
                            />
                        </TouchableOpacity>
                        <Text style={styles.ratingText}>{count}</Text>
                        <TouchableOpacity onPress={() => increment()}>
                            <SimpleLineIcons
                                name='plus'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>
                        Opis produktu
                    </Text>
                    <Text style={styles.descText}>{item.descryption}</Text>
                </View>

                <View style={{marginBottom: SIZES.xLarge}}>
                    <View style={styles.location}>
                        <View style={{flexDirection: "row"}}>
                            <Ionicons name='location-outline' size={20}/>
                            <Text> {item.product_location}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <MaterialCommunityIcons name='truck-delivery-outline' size={20}/>
                            <Text> Darmowa dostawa</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cartRow}>
                    <TouchableOpacity
                        onPress={handleBuyNow}
                        style={styles.cartBtn}
                    >
                        <Text style={styles.cartTitle}>KUP TERAZ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAddToCart}>
                        <Text style={styles.cartTitle}>DODAJ DO KOSZYKA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductDetails;
