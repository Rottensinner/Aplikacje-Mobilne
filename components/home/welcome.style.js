import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    welcomeText: (color) => ({
        fontFamily: "bold",
        fontSize: SIZES.xxLarge -5,
        marginTop: SIZES.xSmall,
        color: color,
        marginHorizontal: 12,
    }),
})

export default styles