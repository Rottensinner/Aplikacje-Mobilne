// Importowanie niezbędnych komponentów, stylów i zasobów
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import styles from './welcome.style'; // Importowanie stylów z pliku welcome.style.js
import { COLORS, SIZES } from '../../constants'; // Importowanie stałych kolorów i rozmiarów
import { Feather, Ionicons } from '@expo/vector-icons'; // Importowanie ikon z biblioteki Expo
import { useNavigation } from '@react-navigation/native'; // Importowanie hooka do nawigacji

// Komponent Welcome
const Welcome = () => {
  const navigation = useNavigation(); // Inicjalizacja hooka do nawigacji

  return (
    <View>
      {/* Kontener dla powitalnego tekstu */}
      <View style={styles.container}>
        {/* Powitalny tekst w trzech częściach z różnymi kolorami */}
        <Text style={styles.welcomeText(COLORS.black)}>Znajdź swoją </Text>
        <Text style={styles.welcomeText(COLORS.primary)}>elektronikę</Text>
        <Text style={styles.welcomeText(COLORS.black)}> u nas</Text>
      </View>

      {/* Kontener dla pola wyszukiwania */}
      <View style={styles.searchContainer}>
        {/* Przycisk do otwierania pola wyszukiwania */}
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        
        {/* Wrapper dla pola tekstowego wyszukiwania */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onFocus={() => navigation.navigate("Search")} // Navigacja do ekranu wyszukiwania po kliknięciu w pole
            placeholder="Czego szukasz?"
          />
        </View>
        
        {/* Kontener dla przycisku aparatu */}
        <View>
          {/* Przycisk aparatu z ikoną kamery */}
          <TouchableOpacity style={styles.searchBtn}>
            {/* <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome; // Eksportowanie komponentu Welcome
