// Importowanie niezbędnych komponentów, stylów i hooka do nawigacji
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import React from "react";
import styles from "./SearchTitle.style"; // Importowanie stylów z pliku SearchTitle.style.js
import { useNavigation } from "@react-navigation/native";

// Komponent SearchTitle
const SearchTitle = ({ item }) => {
    const navigation = useNavigation(); // Inicjalizacja hooka do nawigacji

    return (
        <View>
            {/* Kontener dla całego elementu, reagujący na dotyk i przenoszący do szczegółów produktu */}
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProductDetails', { item })}>
                {/* Kontener dla obrazka produktu */}
                <View style={styles.image}>
                    {/* Wyświetlenie obrazka produktu z URL */}
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.productImg}
                        resizeMode="contain"
                    />
                </View>
                
                {/* Kontener dla tekstu z tytułem, dostawcą i ceną produktu */}
                <View style={styles.textContainer}>
                    {/* Tytuł produktu */}
                    <Text style={styles.productTitle}>{item.title}</Text>
                    
                    {/* Dostawca produktu (uwaga: w oryginalnym kodzie błąd - powinno być item.supplier) */}
                    <Text style={styles.supplier}>{item.supplier}</Text>
                    
                    {/* Cena produktu (uwaga: w oryginalnym kodzie błąd - powinno być item.price) */}
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default SearchTitle; // Eksportowanie komponentu SearchTitle
