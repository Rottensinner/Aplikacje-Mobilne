// Importowanie niezbędnych komponentów, stylów i zasobów
import { TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import styles from './productCardView.style'; // Importowanie stylów z pliku productCardView.style.js
import { Ionicons } from "@expo/vector-icons"; // Importowanie ikon z biblioteki Expo
import { COLORS } from '../../constants'; // Importowanie stałych kolorów
import { useNavigation } from '@react-navigation/native'; // Importowanie hooka do nawigacji

// Komponent ProductCardView
const ProductCardView = ({ item }) => {
  const navigation = useNavigation(); // Inicjalizacja hooka do nawigacji

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { item })}>
      {/* Kontener karty produktu */}
      <View style={styles.container}>
        {/* Kontener dla obrazka produktu */}
        <View style={styles.imageContainer}>
          {/* Wyświetlanie obrazka z URL */}
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>
        
        {/* Kontener dla szczegółów produktu */}
        <View style={styles.details}>
          {/* Tytuł produktu z ograniczeniem do jednej linii tekstu */}
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          
          {/* Dostawca produktu z ograniczeniem do jednej linii tekstu */}
          <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
          
          {/* Cena produktu */}
          <Text style={styles.price}>${item.price}</Text>
        </View>
        
        {/* Przycisk do dodawania produktu do koszyka */}
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name='add-circle' size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView; // Eksportowanie komponentu ProductCardView
