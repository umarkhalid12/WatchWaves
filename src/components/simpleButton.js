import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const SimpleButton = ({ 
  title, 
  onPress, 
  width = 285, 
  paddingVertical = 15, 
  textColor = 'white', // default text color
  backgroundColor = '#3E474B', // default background color
  borderWidth = 0, // default borderWidth
  borderColor = '#3E474B' // default borderColor
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7} 
      style={[
        styles.button, 
        { 
          width, 
          paddingVertical, 
          backgroundColor, 
          borderWidth, 
          borderColor 
        }
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
