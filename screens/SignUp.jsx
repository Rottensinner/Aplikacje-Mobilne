import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from "../constants";
import { Button, BackBtn } from "../components";
import styles from "./login.style";

const validationSchema = Yup.object().shape({

  password: Yup.string()
    .min(8, "Hasło musi składać się z conajmniej 8 znaków")
    .required("Wymagane"),
    email: Yup.string()
    .email("Błędny adres mail")
    .required("Wymagane"),
});


const SignUp=({navigation})=> {

    const [loader, setLoaer] = useState(false);
    const [obscureText,setObsecureTexy] = useState(false);

    const inValidForm = () => {
        Alert.alert(
          "niepoprawna forma",
          "Wprowadź poprawne dane",
          [
            {
              text: "nie", onPress: () => console.log("nie")
            },
            {
              text: "ok", onPress: () => console.log("tak")
            },
            
          ]
        )
      }


    return(
        <ScrollView>
        <SafeAreaView style={{marginHorizontal : 20}}>
        <BackBtn onPress={()=>navigation.goBack()}></BackBtn>

            <View>
                <Text style={styles.title}>Nie bądz taki zaloguj się</Text>
                <Formik
                        initialValues= {{email: '', password:'',username:''}}
                        validationSchema= {validationSchema}
                        onSubmit={(values) => console.log(values) }
                >
                {({ handleChange, handleBlur,touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>
                  <View style={styles.wrapper}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper(touched.email ? COLORS.gray: COLORS.offwhite)}>
                        <MaterialCommunityIcons
                        name="account-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}/>
                        
                  <TextInput 
                  placeholder="Username "
                    onFocus={()=>{setFieldTouched('username')}}
                    onBlur={()=>{setFieldTouched('username','')}}
                    value={values.username}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex:1}}
                  />      
                  </View>
                  {touched.username && errors.username &&(
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  ) }
                    </View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputWrapper(touched.username ? COLORS.gray: COLORS.offwhite)}>
                        <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}/>
                        
                  <TextInput 
                  placeholder="Email"
                    onFocus={()=>{setFieldTouched('email')}}
                    onBlur={()=>{setFieldTouched('email','')}}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex:1}}
                  />      
                  </View>
                  {touched.email && errors.email &&(
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  ) }
                    </View>
                        
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper(touched.password ? COLORS.gray: COLORS.offwhite)}>
                        <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}/>
                        
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
                 
                 <TouchableOpacity  onPress={()=> {setObsecureText(!obscureText)}}>
                    <MaterialCommunityIcons
                    name={obscureText? "eye-outline" : "eye-off-outline"}
                    size={18}
                    />
                 </TouchableOpacity>
                  </View>
                  {touched.password && errors.password &&(
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  ) }

     </View>

     <Button title={"SignUp"} onPress={isValid ? handleSubmit : inValidForm} isValid={isValid}/>
   

   </View>
 )}
                  
                  </Formik>
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}
export default SignUp