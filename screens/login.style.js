import { StyleSheet } from "react-native";
import {COLORS , SIZES} from "../constants"
import { ImageBackground } from "react-native-web";


const styles = StyleSheet.create({
    cover:{
        height: SIZES.height/2.4,
        width: SIZES.width-60,
        resizeMode: "contain",
        marginBottom: SIZES.xxLarge
    },
    title:{
        // marginTop: "15%",
        fontFamily: "bold",
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        alignItems: "center",
        marginBottom: SIZES.xxLarge
    },
    wrapper:{
        marginBottom: 20,
        
},
    label:{
        fontFamily:"regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper:(borderColor)=>({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        borderRadius: 12,
        paddingHorizontal : 15,
        alignItems: "center"
    }),
    iconStyle:{
        marginRight: 10
    },
    errorMessage:{
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft:5,
        fontSize: SIZES.xSmall
    },
    registration:{
        marginTop: 20,
    
        textAlign: "center"
    }
})

export default styles;