import { TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import styles from './productCardView.style';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails')}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/carousel-images/pexels-pixabay-163073.jpg')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1}>Tytuł produktu</Text>
                    <Text style={styles.supplier} numberOfLines={1}>Elektronika</Text>
                    <Text style={styles.price}>223 zł</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name='add-circle' size={35} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCardView