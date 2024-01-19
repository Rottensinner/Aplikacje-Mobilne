import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import SearchTitle from '../components/products/SearchTitle';
import styles from './search.style';
import { COLORS, SIZES } from '../constants';

const Search = () => {
  // Stan do przechowywania tekstu wpisywanego w wyszukiwarkę
  const [searchKey, setSearchKey] = useState('');
  // Stan do przechowywania wyników wyszukiwania
  const [searchResults, setSearchResults] = useState([]);

  // Funkcja do obsługi zmiany tekstu w TextInput
  const handleInputChange = (text) => {
    console.log("Wpisano:", text);
    setSearchKey(text);
  };

  // Funkcja do obsługi zdarzenia wyszukiwania
  const handleSearch = async () => {
    console.log("jazda");
    try {
      // Wykonanie zapytania GET do API z kluczem wyszukiwania
      const response = await axios.get(`http://10.0.2.2:3000/api/products/search/${searchKey}`);
      console.log("Odpowiedź z serwera:", response.data);
      // Ustawienie wyników wyszukiwania w stanie
      setSearchResults(response.data);
    } catch (error) {
      console.error("Błąd podczas wyszukiwania:", error);
    }
  };

  return (
    <SafeAreaView>
      {/* Kontener główny */}
      <View style={styles.searchContainer}>
        {/* Przycisk kamery (obecnie bez funkcji) */}
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon}/>
        </TouchableOpacity>
        {/* Pole wyszukiwania */}
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={handleInputChange}
            placeholder="Czego szukasz?"
          />
        </View>
        {/* Przycisk do wykonania wyszukiwania */}
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Warunkowe renderowanie wyników wyszukiwania lub obrazu, gdy brak wyników */}
      {searchResults.length === 0 ? (
        <View style={{flex:1}}>
          <Image source={require('../assets/5613.png')} style={styles.searchImage}/>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <SearchTitle item={item}/>}
          style={{marginHorizontal:12}}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;