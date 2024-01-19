import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React from 'react';
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import { SafeAreaView } from "react-native";
import ProductCardView from "./ProductCardView";  
import styles from "./ProductList.style"

const ProductList = () => {
    const { data, isLoading, error } = useFetch();
    console.log(data);
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxlarge} color={COLORS.primary} />
            </View>
        );
    }

    // Handle error state as well, if necessary
    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Something went wrong</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) =>( <ProductCardView item={item} /> )}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default ProductList;
