import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: SIZES.xxLarge,
        width: SIZES.width -44,
        zIndex: 999,
    },
    image: {
        aspectRatio: 1,
        resizeMode: "cover",
        maxWidth: "100%",
        maxHeight: "500px",
    },
    details: {
        marginTop: -SIZES.large,
        backgroundColor: COLORS.lightWhite,
        borderTopLeftRadius: SIZES.medium,
        borderTopRightRadius: SIZES.medium,        
    },
    titleRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        top: 20
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large,
    },
    priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large
    },
    price: {
        paddingHorizontal: 10,
        fontFamily: 'semibold',
        fontSize: SIZES.large
    },
    ratingRow: {
        paddingBottom: SIZES.small,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        top: 5
    },
    rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large
    },
    ratingText: {
        color: COLORS.gray,
        fontFamily: "medium",
        paddingHorizontal: SIZES.xSmall,
    },
    descriptionWrapper: {
        marginTop: SIZES.large*2,
        marginHorizontal: SIZES.large
    },
    description: {
        fontFamily: "medium",
        fontSize: SIZES.large -2,
    },
    descText: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        textAlign: "justify",
        marginBottom: SIZES.small
    },
    location: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        padding: SIZES.xSmall,
        borderRadius: SIZES.large
    },
    cartRow: {
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
        flexDirection: "column",
        rowGap: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        width: SIZES.width -44,
    },
    cartBtn: {
        width: "80%",
        backgroundColor: COLORS.black,
        padding: SIZES.small,
        borderRadius: SIZES.large,
    },
    addToCartBtn: {
        width: "80%",
        backgroundColor: COLORS.black,
        padding: SIZES.small,
        borderRadius: SIZES.large,
    },
    cartTitle: {
        fontFamily: "semibold",
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        textAlign: "center"
    },
})

export default styles