import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../constants/index';

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity onPress={isValid ? onPress : null} style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}>
      {loader === false ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator size="small" color={COLORS.white} />
      )}
    </TouchableOpacity>
  );
};


export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: 18,
  },
  btnStyle: (backgroundColor)=>({
    height: 50,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  }),
});