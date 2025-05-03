import { StyleSheet, Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import GradientTextInput from '../components/customInput';
import SimpleButton from '../components/simpleButton';
import TextButton from '../components/textButton';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const navigation = useNavigation();
    const [loading, setloading]=useState(false);

    const handleLogin = (values, { resetForm }) => {
        setloading(true); 
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => { 
                navigation.navigate('DrawerNavigator');
                resetForm();
                setloading(false);
            })
            .catch((error) => {
                Alert.alert("Login failed", error.message);
                setloading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logoIcon.png')} style={styles.logoIcon} />
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}  
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => ( 
                    <>
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

                        <View style={styles.btnStyle}>
                            {
                                loading? <ActivityIndicator size={22} color='#f9bc50'/>
                            :
                            <SimpleButton title="Login" onPress={handleSubmit} />
                            }
                            
                        </View>
                    </>
                )}
            </Formik>

            <View style={styles.text}>
                <Text>Don't Have an Account?</Text>
                <TextButton title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoIcon: {
        height: 200,
        width: 200
    },
    btnStyle: {
        marginTop: 35
    },
    text: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 5,
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
        
    }
});
