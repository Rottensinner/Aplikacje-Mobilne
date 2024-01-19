import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    width: "100%",
    height: "60%",
    resizeMode: "cover", 
  },
  profileContainer:{
    flex: 1,
    alignItems: "center"
  },
  profile:{
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -280,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  
  loginBtn:{
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth:0.4,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xxLarge
  },
  menuText:{
    fontFamily: "regular",
    color: COLORS.gray,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 26
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },

  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingHorizontal: 10, // Poprawiona literówka
    paddingVertical: 15, // Poprawiona literówka
    borderColor: COLORS.gray,
  }),
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
  },
  namelog:{
    padding: 10,
  }
});


 


export default styles;
