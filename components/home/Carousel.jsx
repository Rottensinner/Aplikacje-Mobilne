// Importowanie niezbędnych komponentów i stylów z React Native oraz stałych niestandardowych
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";

// Komponent funkcyjny dla karuzeli obrazów
const Carousel = () => {
    // Tablica zawierająca źródła obrazów dla slajdów karuzeli
    const slides = [
        require('../../assets/carousel-images/pexels-pixabay-163073.jpg'),
        require('../../assets/carousel-images/pexels-pixabay-163100.jpg'),
        require('../../assets/carousel-images/pexels-pixabay-356056.jpg'),
    ];

    // JSX do renderowania komponentu
    return (
        <View style={styles.carouselContainer}>
            {/* Komponent SliderBox dla karuzeli obrazów */}
            <SliderBox
                images={slides}  // Tablica źródeł obrazów
                dotColor={COLORS.primary}  // Kolor aktywnego punktu
                inactiveDotColor={COLORS.secondary}  // Kolor nieaktywnych punktów
                ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}  // Style dla poszczególnych obrazów
                autoplay  // Automatyczne odtwarzanie karuzeli
                circleLoop  // Zapętlenie karuzeli w sposób okrężny
            />
        </View>
    );
};

// Eksportowanie komponentu Carousel jako domyślny eksport
export default Carousel;

// Style dla komponentu Carousel
const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,  // Flex 1 pozwala komponentowi zajmować całą dostępną przestrzeń
        alignItems: "center",  // Wyśrodkowanie elementów w poziomie
    }
});
