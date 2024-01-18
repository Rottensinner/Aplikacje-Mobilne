// Importowanie niezbędnych komponentów, stylów i zasobów
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './headings.style'; // Importowanie stylów z pliku headings.style.js
import { Ionicons } from "@expo/vector-icons"; // Importowanie ikon z biblioteki Expo
import { COLORS } from '../../constants'; // Importowanie stałych kolorów
import { useNavigation } from '@react-navigation/native'; // Importowanie hooka do nawigacji

// Komponent Headings
const Headings = () => {
  const navigation = useNavigation(); // Inicjalizacja hooka do nawigacji
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Nagłówek aplikacji */}
        <Text style={styles.headerTitle}>Nowo dodana elektronika</Text>

        {/* Przycisk do przejścia do listy produktów */}
        <TouchableOpacity onPress={() => { navigation.navigate("ProductList") }}>
          <Ionicons name='ios-grid' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Headings; // Eksportowanie komponentu Headings
