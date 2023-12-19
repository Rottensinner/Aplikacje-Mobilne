import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Fontisto } from "@expo/vector-icons";
import styles from './home.style';
import Welcome from '../components/home/Welcome';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';

const Home = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.appBarWrapper}>
                    <View style={styles.appBar}>
                        <View>
                            <View style={styles.cartCount}>
                                <Text style={styles.cartNumber}>8</Text>
                            </View>
                            <TouchableOpacity>
                                <Fontisto name='shopping-bag' size={24}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{marginBottom: 82}}>
                    <Welcome />
                    <Carousel />
                    <Headings />
                    <ProductRow />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home