import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    light: require("./assets/fonts/Montserrat-Light.ttf"),
    bold: require("./assets/fonts/Montserrat-Bold.ttf"),
    medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    semiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    extrabold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
  })

  const onLayoutRootView = useCallback(async() => {
    
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: "regular",
    fontSize: 20,
  }
});
