import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 260,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer: {
        width: 170,
        marginLeft: SIZES.small/2,
        marginTop: SIZES.small/2,
        borderRadius: SIZES.small,
        backgroundColor: "white",
    },
    image: {
        aspectRatio: 1,
        resizeMode: "contain",
        maxWidth: "100%"
    },
    details: {
        padding: SIZES.small
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large,
        marginBottom: 2,
    },
    supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
    },
    addBtn: {
        position: "absolute",
        bottom: SIZES.small/2,
        right: SIZES.small/2
    }
})

export default styles;