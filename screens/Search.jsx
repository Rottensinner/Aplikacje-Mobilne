import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
          <TouchableOpacity>
              <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon}/>
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
              <TextInput
                  style={styles.searchInput}
                  value=""
                  onFocus={()=>{}}
                  placeholder="Czego szukasz?"
              />
          </View>
          <View>
              <TouchableOpacity style={styles.searchBtn}>
                  <Feather name="search" size={24} color={COLORS.offwhite}/>
              </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default Search