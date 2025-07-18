import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import GradientTextInput from '../components/customInput';
import SimpleButton from '../components/simpleButton';
import TextButton from '../components/textButton';
import { useAuth } from '../services/authContext';

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short!').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const { signIn } = useAuth();

  const handleRegister = (values, { resetForm }) => {
    setloading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        await signIn(userCredential.user.uid);
        navigation.navigate('DrawerNavigator');

        resetForm();
        setloading(false);
      })
      .catch((error) => {
        Alert.alert('Registration failed', error.message);
        setloading(false);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="#f9bc50" />
      </TouchableOpacity>

      <Image source={require('../assets/images/logoIcon.png')} style={styles.logoIcon} />

      <Formik
        initialValues={{ username: '', email: '', password: '', repassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <GradientTextInput
              placeholder="Username"
              icon="person"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <GradientTextInput
              placeholder="Email"
              icon="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <GradientTextInput
              placeholder="Password"
              icon="lock"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <GradientTextInput
              placeholder="Re-type Password"
              icon="lock"
              secureTextEntry
              onChangeText={handleChange('repassword')}
              onBlur={handleBlur('repassword')}
              value={values.repassword}
            />
            {touched.repassword && errors.repassword && <Text style={styles.errorText}>{errors.repassword}</Text>}

            <View style={styles.btnStyle}>
              {loading ? (
                <ActivityIndicator size={22} color="#f9bc50" />
              ) : (
                <SimpleButton title="Register" onPress={handleSubmit} />
              )}
            </View>
          </>
        )}
      </Formik>

      <View style={styles.text}>
        <Text>Already Have an Account?</Text>
        <TextButton title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 10,
  },
  logoIcon: {
    height: 200,
    width: 200,
  },
  btnStyle: {
    marginTop: 35,
  },
  text: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
