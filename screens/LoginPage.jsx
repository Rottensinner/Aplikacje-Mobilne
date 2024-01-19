import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./login.style";
import { Button } from "../components"; // Upewnij się, że Button jest właściwie zaimportowane
// Niepotrzebny import BackBtn został usunięty
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Schemat walidacji dla formularza logowania
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [obscureText, setObsecureText] = useState(false);

  // Funkcja wyświetlająca alert o błędnej formie
  const invalidForm = () => {
    Alert.alert("Niepoprawna forma", "Wprowadź poprawne dane");
  };

  // Główna funkcja logowania
  const login = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/login', values);
      if (response.status === 200 && response.data._id) {
        await AsyncStorage.setItem(`user${response.data._id}`, JSON.stringify(response.data));
        navigation.replace("Bottom Navigation");
      } else {
        // Informacja dla użytkownika, gdy dane logowania są niepoprawne
        Alert.alert("Błąd logowania", "Wprowadź poprawne dane");
      }
    } catch (error) {
      // Informacja o błędzie logowania
      Alert.alert("Błąd logowania", "Wystąpił problem podczas logowania. Spróbuj ponownie.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Nie bądź taki zaloguj się</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => login(values)}
        >
          {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid }) => (
            <>
              {/* Sekcja email */}
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} />
                  <TextInput
                    placeholder="Email"
                    onBlur={handleBlur('email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
                {touched.email && errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
              </View>

              {/* Sekcja hasła */}
              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.gray} />
                  <TextInput
                    secureTextEntry={obscureText}
                    placeholder="Password"
                    onBlur={handleBlur('password')}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {/* Przycisk pokazania/ukrycia hasła */}
                  <TouchableOpacity onPress={() => { setObsecureText(!obscureText) }}>
                    <MaterialCommunityIcons name={obscureText ? "eye-outline" : "eye-off-outline"} size={18} />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
              </View>

              {/* Przycisk logowania */}
              <Button
                loader={loader}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : invalidForm}
              />

              {/* Link do rejestracji */}
              <Text style={styles.registration} onPress={() => navigation.navigate('SignUp')}>
                Register
              </Text>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginPage;
