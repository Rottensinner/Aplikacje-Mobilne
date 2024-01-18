// Importowanie niezbędnych komponentów, stylów i ikon z biblioteki Expo
import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';

// Komponent BackBtn
const BackBtn = ({ onPress }) => {
    return (
        // Przycisk powrotu z ikoną strzałki do tyłu
        <TouchableOpacity onPress={onPress} style={styles.BackBtn}>
            <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.primary}
            />
        </TouchableOpacity>
    );
}

export default BackBtn; // Eksportowanie komponentu BackBtn

// Styl komponentu BackBtn
const styles = StyleSheet.create({
    BackBtn: {
        alignItems: "center",
        position: "absolute",
        top: SIZES.large - 10, // Górny odstęp od krawędzi ekranu
    }
});
