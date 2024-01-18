// Importowanie niezbędnych komponentów, stylów i zasobów
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/index';

// Komponent Button
const Button = ({ title, onPress, isValid, loader }) => {
  return (
    // Komponent TouchableOpacity jako przycisk, reagujący na dotyk
    <TouchableOpacity onPress={isValid ? onPress : null} style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}>
      {/* Warunek - czy wyświetlić tekst przycisku czy wskaźnik ładowania */}
      {loader === false ? (
        // Tekst przycisku
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        // Wskaźnik ładowania
        <ActivityIndicator size="small" color={COLORS.white} />
      )}
    </TouchableOpacity>
  );
};

export default Button; // Eksportowanie komponentu Button

// Styl komponentu Button
const styles = StyleSheet.create({
  btnText: {
    fontFamily: 'bold', // Używanie czcionki o wadze bold
    color: COLORS.white, // Kolor tekstu
    fontSize: 18, // Rozmiar tekstu
  },
  btnStyle: (backgroundColor) => ({
    height: 50, // Wysokość przycisku
    width: '100%', // Szerokość przycisku
    marginVertical: 20, // Odstęp między przyciskami
    backgroundColor: backgroundColor, // Kolor tła przycisku
    justifyContent: 'center', // Wyśrodkowanie zawartości w pionie
    alignItems: 'center', // Wyśrodkowanie zawartości w poziomie
    borderRadius: 12, // Zaokrąglenie narożników
  }),
});
