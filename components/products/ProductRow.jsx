// Importowanie niezbędnych komponentów, stylów, zasobów i hooka do pobierania danych
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants'; // Importowanie stałych kolorów i rozmiarów
import ProductCardView from './ProductCardView'; // Importowanie komponentu karty produktu
import styles from './productRow.style'; // Importowanie stylów z pliku productRow.style.js
import useFetch from '../../hook/useFetch'; // Importowanie hooka do pobierania danych

// Komponent ProductRow
const ProductRow = () => {
    // Destructuring zwróconych danych, stanu ładowania i ewentualnego błędu
    const { data, isLoading, error } = useFetch();

    // Obsługa błędów sieciowych
    if (error) {
        console.log("Wystąpił błąd podczas pobierania danych:", error);
        return (
            <View style={styles.container}>
                <Text>Wystąpił błąd sieciowy. Spróbuj ponownie później.</Text>
            </View>
        );
    }

    // Obsługa braku danych
    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Brak dostępnych produktów.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Warunek, jeśli dane są w trakcie ładowania */}
            {isLoading ? (
                <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
            ) : (
                // Komponent FlatList do renderowania listy produktów w trybie poziomym
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id} // Klucz dla elementów listy
                    renderItem={({ item }) => <ProductCardView item={item} />} // Renderowanie pojedynczego elementu
                    horizontal // Ustawienie listy w trybie poziomym
                    contentContainerStyle={{ padding: SIZES.medium }} // Styl kontenera dla zawartości listy
                />
            )}
        </View>
    );
};

export default ProductRow; // Eksportowanie komponentu ProductRow
