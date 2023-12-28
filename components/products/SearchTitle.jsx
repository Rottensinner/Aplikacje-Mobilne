import { StyleSheet,TouchableOpacity, Text, View, Image } from "react-native";
import React from "react";
import styles from "./SearchTitle.style";
import { useNavigation } from "@react-navigation/native";

const SearchTitle =({item}) =>{
    const navigation=useNavigation();
    return(
        <View>
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('ProductDetails',{item})}>
            <View style={styles.image}>
            <Image source={{uri: item.ImageUrl}}
            style={styles.productImg}
            resizeMode="contain"/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.supplier}>{styles.supplier}</Text>
                <Text style={styles.supplier}>{styles.price}</Text>

            </View>
        </TouchableOpacity>
        </View>
    )
}

export default SearchTitle