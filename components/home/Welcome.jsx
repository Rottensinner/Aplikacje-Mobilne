import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react';
import styles from './welcome.style';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeText(COLORS.black)}>Znajdź swoją </Text>
                <Text style={styles.welcomeText(COLORS.primary)}>elektronikę</Text>
                <Text style={styles.welcomeText(COLORS.black)}> u nas</Text>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onFocus={()=>navigation.navigate("Search")}
                        placeholder="Czego szukasz?"
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Welcome