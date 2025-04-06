import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';


const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    alignItems:'center',

  },
  buttonText: {
    color: '#f9bc50',
    fontSize: 15,
    fontWeight: 'bold',
    
  },
});
