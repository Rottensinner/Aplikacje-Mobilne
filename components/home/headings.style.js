import { StyleSheet } from "react-native";
// Importowanie stałych kolorów i rozmiarów z pliku constants
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
        marginHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        fontFamily: "semibold",
        fontSize: SIZES.xLarge -2,
    }
})

export default styles;