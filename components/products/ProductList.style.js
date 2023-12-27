import { StyleSheet } from "react-native";
import {COLORS,SIZES} from "../../constants"
const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        aliginItems: "center",
        justifyContent: "center",
        alignContent: "center",

    },
    container:{
        alignContent: "center",
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small/2
    }

})
export default styles