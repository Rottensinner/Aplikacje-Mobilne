import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productRow.style';
import useFetch from '../../hook/useFetch';

const ProductRow = () => {
    const { data, isLoading, error } = useFetch();
    const products = [1, 2, 3, 4];

    // Dodanie logiki do obsługi błędu
    if (error) {
        console.log("Wystąpił błąd podczas pobierania danych:", error);
        return (
            <View style={styles.container}>
                <Text>Coś poszło nie tak</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
            ) : (
                <FlatList
                    data={data || products} // Zastępcze dane, jeśli brak danych
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductCardView item={item} />}
                    horizontal
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                />
            )}
        </View>
    );
};

export default ProductRow;
