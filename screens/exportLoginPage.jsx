import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./login.style";
import { Button, BackBtn } from "../components";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObsecureText] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');


  const invalidForm = () => {
    Alert.alert(
      "Niepoprawna forma",
      "Wprowadź poprawne dane",
      [
        {
          text: "Nie", onPress: () => console.log("Nie")
        },
        {
          text: "Ok", onPress: () => console.log("Tak")
        },

      ]
    )
  };
  const login = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/login', values);
  
      console.log(response.status);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData._id) {
          console.log(`user${responseData._id}`);
  
          await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
          await AsyncStorage.setItem(`id`, JSON.stringify(responseData._id));
          setLoader(false);
          const userName = responseData.userName;
          console.log(`Zalogowany jako: ${userName}`);
          await AsyncStorage.setItem('userName', userName); // Zapisz nazwę użytkownika bezpośrednio w AsyncStorage
  
          navigation.replace("Bottom Navigation");
        } else {
          // Odpowiedź nie zawiera _id, więc oczekuj na drugą próbę.
          // Możesz dodać opóźnienie lub zaimplementować ponowną próbę po pewnym czasie.
          setTimeout(async () => {
            const secondResponse = await axios.post('http://10.0.2.2:3000/api/login', values);
            if (secondResponse.status === 200 && secondResponse.data._id) {
              const secondResponseData = secondResponse.data;
              console.log(`user${secondResponseData._id}`);
              await AsyncStorage.setItem(`user${secondResponseData._id}`, JSON.stringify(secondResponseData));
              await AsyncStorage.setItem(`id`, JSON.stringify(secondResponseData._id));
              setLoader(false);
              navigation.replace("Bottom Navigation");
            } else {
              Alert.alert(
                "Błąd logowania",
                "Wprowadź poprawne dane",
                [
                  {
                    text: "Ok",
                    onPress: () => console.log("Tak"),
                  },
                ]
              );
            }
          }, 1000); // Możesz dostosować opóźnienie według własnych potrzeb.
        }
      } else {
        Alert.alert(
          "Błąd logowania",
          "Wprowadź poprawne dane",
          [
            {
              text: "Ok",
              onPress: () => console.log("Tak"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      Alert.alert(
        "Błąd logowania",
        "Wystąpił problem podczas logowania. Spróbuj ponownie.",
        [
          {
            text: "Ok",
            onPress: () => console.log("Tak"),
          },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <BackBtn onPress={() => navigation.goBack()}></BackBtn>
        <View>
          <Text style={styles.title}>Nie bądz taki zaloguj się</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.gray : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Email"
                      onFocus={() => { setFieldTouched('email') }}
                      onBlur={() => { setFieldTouched('email', '') }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.gray : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obscureText}
                      placeholder="Password"
                      onFocus={() => { setFieldTouched('password') }}
                      onBlur={() => { setFieldTouched('password', '') }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => { setObsecureText(!obscureText) }}>
                      <MaterialCommunityIcons
                        name={obscureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>


                <Button
                loader={loader}
                 title={"L O G I N"}
                 onPress={isValid ? handleSubmit : invalidForm} 
                 isValid={isValid}
                 />
                <Text style={styles.registration} onPress={() => navigation.navigate('SignUp')}>Register</Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}


