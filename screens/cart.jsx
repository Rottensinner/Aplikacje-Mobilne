import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './cart.style';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
  // Definicja zmiennych stanu
  const [cartData, setCartData] = useState([]); // Przechowuje elementy koszyka
  const [loading, setLoading] = useState(true); // Wskazuje stan ładowania
  const [userId, setUserId] = useState(null); // Przechowuje identyfikator użytkownika

  useEffect(() => {
    // Pobierz identyfikator użytkownika z AsyncStorage przy montowaniu komponentu
    const getUserIdFromStorage = async () => {
      try {
        const idFromStorage = await AsyncStorage.getItem('id');

        if (idFromStorage !== null) {
          // Jeśli identyfikator użytkownika istnieje w AsyncStorage, ustaw go w stanie
          console.log('Pobrane userId z AsyncStorage:', idFromStorage);
          setUserId(idFromStorage);
        } else {
          console.log('userId nie istnieje w AsyncStorage.');
        }
      } catch (error) {
        console.error("Błąd podczas pobierania userId z AsyncStorage:", error);
      }
    };

    // Wywołaj funkcję do pobrania identyfikatora użytkownika z AsyncStorage
    getUserIdFromStorage();
  }, []);

  useEffect(() => {
    // Gdy zmienia się identyfikator użytkownika, pobierz dane koszyka
    if (userId) {
      console.log("Pobieram dane koszyka...");
      fetchCartData();
    }
  }, [userId]);

  // Funkcja do pobierania danych koszyka z serwera
  const fetchCartData = async () => {
    setLoading(true);
    try {
      console.log('Rozpoczęto pobieranie danych koszyka...');
      const a = JSON.parse(userId);
      console.log(a);
      const zapytanie = `http://10.0.2.2:3000/api/cart/find/${a}`;
      console.log(zapytanie);
      const response = await axios.get(zapytanie);
      console.log('Odpowiedź z serwera:', response.data);
      setCartData(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych koszyka:', error);
    } finally {
      setLoading(false);
      console.log('Zakończono pobieranie danych koszyka.');
    }
  };

  // Funkcja do usuwania przedmiotu z koszyka
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/api/cart/${userId}/${cartItemId}`);
      if (response.status === 200) {
        // Odśwież dane koszyka po pomyślnym usunięciu przedmiotu
        fetchCartData();
        Alert.alert("Usunięto", "Produkt został usunięty z koszyka.");
      }
    } catch (error) {
      console.error('Błąd podczas usuwania produktu z koszyka:', error);
      Alert.alert('Błąd', 'Nie udało się usunąć produktu z koszyka.');
    }
  };

  // Funkcja do składania zamówienia
  const placeOrder = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/order', { userId, products: cartData });
      if (response.status === 200) {
        // Wyczyść koszyk po pomyślnym złożeniu zamówienia
        setCartData([]);
        Alert.alert("Sukces", "Zamówienie zostało złożone.");
        // Tutaj możesz przekierować użytkownika na stronę potwierdzenia zamówienia
        navigation.navigate('OrderConfirmation');
      }
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
      Alert.alert('Błąd', 'Nie udało się złożyć zamówienia.');
    }
  };
  const increaseQuantity = (cartItemId, productId) => {
    const updatedCartData = [...cartData];
    const cartItem = updatedCartData.find((item) => item._id === cartItemId);
    if (cartItem) {
      const product = cartItem.products.find((product) => product._id === productId);
      if (product) {
        product.quantity += 1; // Zwiększ ilość produktu
        setCartData(updatedCartData); // Zaktualizuj stan koszyka
      }
    }
  };
  
  const decreaseQuantity = (cartItemId, productId) => {
    const updatedCartData = [...cartData];
    const cartItem = updatedCartData.find((item) => item._id === cartItemId);
    if (cartItem) {
      const product = cartItem.products.find((product) => product._id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1; // Zmniejsz ilość produktu (nie można zejść poniżej 1)
        setCartData(updatedCartData); // Zaktualizuj stan koszyka
      }
    }
  };

  // Renderowanie interfejsu użytkownika komponentu
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twój Koszyk</Text>
      {cartData.length === 0 ? (
        <Text style={styles.emptyCartText}>Twój koszyk jest pusty.</Text>
      ) : (
        <FlatList
  data={cartData}
  keyExtractor={(item) => item._id.toString()}
  renderItem={({ item }) => (
    <View style={styles.cartItem}>
      {item.products.map((product, index) => {
        // Pobierz cenę produktu z obiektu produktu
        const productPrice = parseFloat(product.cartItem.price);

        return (
            <View style={styles.productContainer} key={index}>
            <Image
              source={{ uri: product.cartItem.imageUrl }}
              style={styles.productThumbnail}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Nazwa produktu: {product.cartItem.title}</Text>
              <Text style={styles.productPrice}>Cena produktu: {productPrice.toFixed(2)} zł</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => increaseQuantity(item._id, product._id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.productQuantity}>{product.quantity}</Text>
                <TouchableOpacity onPress={() => decreaseQuantity(item._id, product._id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
      {/* Przycisk do usuwania przedmiotu z koszyka */}
      <TouchableOpacity onPress={() => removeFromCart(item._id)}>
        <MaterialCommunityIcons
          name="delete"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  )}
/>
      )}
      {cartData.length > 0 && (
  <View style={styles.cartFooter}>
    <Text style={styles.totalPrice}>
      Razem: {cartData.reduce((total, item) => {
        // Sumuj ceny produktów w koszyku
        const itemTotalPrice = item.products.reduce((subtotal, product) => {
          // Pobierz cenę produktu z obiektu
          const productPrice = parseFloat(product.cartItem.price);
          // Oblicz cenę produktu pomnożoną przez ilość
          const productTotal = productPrice * product.quantity;
          return subtotal + productTotal;
        }, 0);
        return total + itemTotalPrice;
      }, 0).toFixed(2)} zł
    </Text>
    <TouchableOpacity
      style={styles.placeOrderButton}
      onPress={placeOrder}
    >
      <Text style={styles.placeOrderButtonText}>Złóż zamówienie</Text>
    </TouchableOpacity>
  </View>
)}

    </View>
  );
};

export default Cart;
