import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import { ProductDetails,NewRivals,Cart,LoginPage, Orders, SignUp } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        regular: require("./assets/fonts/Montserrat-Regular.ttf"),
        light: require("./assets/fonts/Montserrat-Light.ttf"),
        bold: require("./assets/fonts/Montserrat-Bold.ttf"),
        medium: require("./assets/fonts/Montserrat-Medium.ttf"),
        semibold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        extrabold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Bottom Navigation"
                    component={BottomTabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="ProductList"
                    component={NewRivals}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Orders"
                    component={Orders}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
