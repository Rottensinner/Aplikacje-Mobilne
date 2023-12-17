import { View, Text } from 'react-native'
import React from 'react'
import styles from './welcome.style'
import { COLORS } from '../../constants'

const Welcome = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.welcomeText(COLORS.black)}>Znajdź swoją </Text>
                <Text style={styles.welcomeText(COLORS.primary)}>elektronikę</Text>
                <Text style={styles.welcomeText(COLORS.black)}> u nas</Text>
            </View>
        </View>
    )
}

export default Welcome