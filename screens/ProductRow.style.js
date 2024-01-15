import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:3000/api/products/");
            console.log("Dane otrzymane:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Zrobiło siup bęc:", error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();


    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;

to jest useFetch

import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productRow.style';
import useFetch from '../../hook/useFetch';

const ProductRow = () => {
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
            {isLoading ? (
                <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductCardView item={item} />}
                    horizontal
                    contentContainerStyle={{ padding: SIZES.medium }}
                />
            )}
        </View>
    );
};

export default ProductRow;

