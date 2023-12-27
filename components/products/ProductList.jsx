import {ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native-web"
import React from 'react';
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import ProductCardView from "./ProductCardView";

const ProductList = () => {
    const {data, isLoading, error } = useFetch();
if(isLoading){
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.xxlarge} color={COLORS.primary}/>
        </View>
    );
    }
    return(
        <View style={styles.container}>
                   <FlatList
                    data={
                        data
                    }
                    numColums={2}
                    renderItem={({item})=>(<ProductCardView item={item}/>)}
                    contentContainerStyle = {styles.container}
                    ItemSeparatorComponent= {()=> <View style={styles.separator}/>}
                   />
        </View>
    )
}
export default ProductList