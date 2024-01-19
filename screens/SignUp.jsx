import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, Alert, StyleSheet, ActivityIndicator,TouchableOpacity } from "react-native"; // Dodaj import ActivityIndicator
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from 'formik';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import * as Yup from 'yup';
import { COLORS } from "../constants";
import { Button, BackBtn } from "../components";
import axios from "axios";

// Schemat walidacji Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Nazwa użytkownika jest wymagana"),
  email: Yup.string()
    .email("Błędny adres email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(8, "Hasło musi składać się z co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
});

const SignUp = ({ navigation }) => {
  const [obscureText, setObscureText] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Dodaj stan isLoading

  const handleSignUp = async (values) => {
    try {
      setIsLoading(true); // Ustaw isLoading na true przed wysłaniem żądania

      const response = await axios.post('http://10.0.2.2:3000/api/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      
      if (response.status === 201) {
        // Użytkownik został pomyślnie zarejestrowany
        Alert.alert("Sukces", "Konto zostało pomyślnie założone.");
        navigation.navigate('Login'); // Przekieruj użytkownika na ekran logowania
      }
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error.response.data);
      // Obsłuż błąd rejestracji
      if (error.response && error.response.data) {
        Alert.alert("Błąd", error.response.data.message);
      } else {
        Alert.alert("Błąd", "Wystąpił nieoczekiwany błąd podczas rejestracji.");
      }
    } finally {
      setIsLoading(false); // Ustaw isLoading na false po zakończeniu rejestracji (zarówno po sukcesie, jak i błędzie)
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <BackBtn onPress={() => navigation.goBack()} />

        <View style={styles.content}>
          <Text style={styles.title}>Zarejestruj się</Text>
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid }) => (
              <View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Nazwa użytkownika</Text>
                  <TextInput 
                    placeholder="Nazwa użytkownika"
                    onBlur={handleBlur('username')}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    style={styles.input}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput 
                    placeholder="Email"
                    onBlur={handleBlur('email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    style={styles.input}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Hasło</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput 
                      placeholder="Hasło"
                      secureTextEntry={obscureText}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                      <MaterialCommunityIcons
                        name={obscureText ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <Button title="Zarejestruj się" onPress={isValid ? handleSubmit : () => Alert.alert("Niepoprawne dane", "Wprowadź poprawne dane")} isValid={!isLoading} loader={isLoading} />      
                </View>
            )}
          </Formik>
          {/* Warunkowe renderowanie kręcącej się ikonki */}
          {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  icon: {
    padding: 10,
    textAlign: "right",
    
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default SignUp;
