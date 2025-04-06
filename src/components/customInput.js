import { StyleSheet, TextInput, View, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GradientTextInput = ({ placeholder, value, onChangeText, secureTextEntry, icon }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1.2 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  return (
    <LinearGradient
      colors={['#f9bc50', '#4e5b60']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.inputContainer}>
        <MaterialIcons name={icon} size={22} color="#f9bc50" style={styles.iconLeft} />
        <Animated.Text
          style={[styles.label, {
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [14, -6],
            }),
            fontSize: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: isFocused ? '#f9bc50' : '#4e5b60',
          }]}
        >
          {placeholder}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={22}
              color="#4e5b60"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default GradientTextInput;

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
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