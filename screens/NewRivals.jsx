import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Używane do wyświetlania ikon
import { SafeAreaView } from "react-native-safe-area-context"; // Zapewnia bezpieczne obszary na urządzeniach z notchem itp.
import styles from "./newRivals.style"; // Importowane style specyficzne dla tego komponentu
import { COLORS } from "../constants"; // Importowane stałe kolorów
import ProductList from "../components/products/ProductList"; // Komponent listy produktów

// Główny komponent NewRivals, wyświetlający nowo dodane produkty
const NewRivals = ({navigation}) =>{
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Górny rząd z przyciskiem powrotu i tytułem */}
                <View style={styles.upperRow}>
                    {/* Przycisk powrotu */}
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons
                            name='chevron-back-circle'
                            size={30} color={COLORS.lightWhite}
                        />
                    </TouchableOpacity>
                    {/* Tytuł sekcji */}
                    <Text style={styles.heading}>Produkty</Text>
                </View>
                {/* Lista produktów */}
                <ProductList/>
            </View>
        </SafeAreaView>
    )
}
export default NewRivals; // Eksport komponentu NewRivals
