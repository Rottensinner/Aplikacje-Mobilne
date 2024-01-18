import { View, Text, TouchableOpacity, TextInput,Image } from 'react-native'
import React, {useState} from 'react';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { FlatList } from 'react-native';
import SearchTitle from '../components/products/SearchTitle';


const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState('');
  console.log('Search Results:', searchResults);

  const handleSearch = async () => {
    try {
      console.log('Search Key:', searchKey); // Log the search key before sending the request
  
      const response = await axios.get(`http://10.10.2.2:3000/api/products/search/${searchKey}`);
      console.log('Response Data:', response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const handleSearchKeyChange = (text) => {
    console.log('Search Key:', text);
    setSearchKey(text);
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={handleSearchKeyChange}
            placeholder="Czego szukasz?"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch()}>
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
          </View>
      </View>
      {searchResults.length === 0 ?(
        <View style={{flex:1}}>
          <Image source={require('../assets/5613.png')}
          style={styles.searchImage}/>
        </View>
      ):(
        <FlatList
        data={searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <SearchTitle item={item} />}
        style={{ marginHorizontal: 12 }}
      />
      )}
    </SafeAreaView>
  )
}

export default Search