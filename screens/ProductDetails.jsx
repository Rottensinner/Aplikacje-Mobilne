import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, {useState} from 'react';
import styles from './productDetails.style';
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { COLORS, SIZES } from '../constants';

const ProductDetails = ({navigation}) => {
    const [count, setCount] = useState(10)

    const decrement = () => {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    const increment = () => {
        setCount(count + 1)
    }

    return (
        <View style={styles.container}>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons
                        name='chevron-back-circle'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons
                        name='heart'
                        size={30}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={require('../assets/carousel-images/pexels-pixabay-163073.jpg')}
                style={styles.image}
            />

            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Tytuł produktu</Text>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.price}>123.45 zł</Text>
                    </View>
                </View>

                <View style={styles.ratingRow}>
                    <View style={styles.rating}>
                        {[1,2,3,4,5].map((index) => (
                            <Ionicons
                                key={index}
                                name='star'
                                size={24}
                                color='gold'
                            /> 
                        ))}
                        
                        <Text style={styles.ratingText}>  (4.9)</Text>
                    </View>
                    
                    <View style={styles.rating}>
                        <TouchableOpacity onPress={() => decrement()}>
                            <SimpleLineIcons
                                name='minus'
                                size={20}
                            />
                        </TouchableOpacity>
                        <Text style={styles.ratingText}>{count}</Text>
                        <TouchableOpacity onPress={() => increment()}>
                            <SimpleLineIcons
                                name='plus'
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>
                        Opis produktu
                    </Text>
                    <Text style={styles.descText}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos cumque deleniti, ex repudiandae quaerat similique vero debitis, reiciendis quam natus aut provident dicta ratione error beatae expedita ullam, incidunt nam.
                    </Text>
                </View>

                <View style={{marginBottom: SIZES.xLarge}}>
                    <View style={styles.location}>
                        <View style={{flexDirection: "row"}}>
                            <Ionicons name='location-outline' size={20}/>
                            <Text> Kielce</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <MaterialCommunityIcons name='truck-delivery-outline' size={20}/>
                            <Text> Darmowa dostawa</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cartRow}>
                    <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
                        <Text style={styles.cartTitle}>KUP TERAZ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}} style={styles.addToCartBtn}>
                        <Text style={styles.cartTitle}>DODAJ DO KOSZYKA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductDetails