import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const SimpleInput = ({ placeholder, value, onChangeText,onSubmitEditing }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <LinearGradient
      colors={['#f9bc50', '#4e5b60']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#bdc3c7"
          onChangeText={onChangeText}
          cursorColor="#f9bc50"
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </LinearGradient>
  );
};

export default SimpleInput;

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  label: {
    position: 'absolute',
    left: 38,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
});