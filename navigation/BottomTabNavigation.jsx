import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile, Search } from "../screens"; // Importowanie komponentów ekranów
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";

const Tab = createBottomTabNavigator();

// Opcje wyświetlania na dole ekranu
const screenOptions = {
  tabBarShowLabel: false, // Ukrycie etykiet na pasku nawigacyjnym
  tabBarHideOnKey: true, // Ukrycie paska nawigacyjnego podczas wprowadzania tekstu
  headerShown: false, // Ukrycie nagłówka
  tabBarStyle: {
    position: "absolute", // Ustawienie absolutnej pozycji paska nawigacyjnego
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0, // Zera cienia na Androidzie
    height: 70, // Wysokość paska nawigacyjnego
  }
}

// Komponent nawigacji dolnej zakładki
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        {/* Ekran domowy */}
        <Tab.Screen
         name="Home"
         component={Home}
         options={{
            tabBarIcon: ({focused}) => {
                return (
                    <Ionicons 
                        name={focused ? "home" : "home-outline"}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                    />
                );
            },
         }}
        />
        {/* Ekran wyszukiwania */}
        <Tab.Screen
         name="Search"
         component={Search}
         options={{
            tabBarIcon: ({focused}) => {
                return (
                    <Ionicons 
                        name={"search-sharp"}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                    />
                );
            },
         }}
        />
        {/* Ekran profilu */}
        <Tab.Screen
         name="Profile"
         component={Profile}
         options={{
            tabBarIcon: ({focused}) => {
                return (
                    <Ionicons 
                        name={focused ? "person" : "person-outline"}
                        size={24}
                        color={focused ? COLORS.primary : COLORS.gray2}
                    />
                );
            },
         }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation; // Eksportowanie komponentu nawigacji dolnej zakładki
