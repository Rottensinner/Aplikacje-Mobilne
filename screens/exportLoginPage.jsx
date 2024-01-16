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