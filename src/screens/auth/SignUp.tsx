import { useNavigation, useTheme, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { setAuth, setToken, setUser } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const SignUp: React.FC = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const navigation: any = useNavigation();
    const route: any = useRoute();

    const logo = require('../../assets/logo.png');
    const back = require('../../assets/icons/Back.png');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const areInputsFilled = email.length > 0 && password.length > 0;

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params.email);
        }
    }, [route.params?.email]);

    const handleSignUp = async () => {
        setErrorMessage('');
        setLoading(true);

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Store additional user data in Firestore
            const createdAt = new Date().toISOString(); // ✅ serializable string

            const userData = {
                email: user.email,
                uid: user.uid,
                createdAt,
            };

            await firestore().collection('users').doc(user.uid).set(userData);

            const idToken = await user.getIdToken();

            dispatch(setUser(userData));
            dispatch(setToken(idToken));
            dispatch(setAuth(true));

        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Email is already in use.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Invalid email address.');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('Password should be at least 6 characters.');
            } else {
                setErrorMessage('Sign up failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    animated={true}
                    backgroundColor="white"
                    barStyle="dark-content"
                    hidden={false}
                />
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={back} style={styles.backButtonImg} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentArea}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.welcomeText}>Welcome to{'\n'} GymSense! </Text>
                    <Text style={styles.emailText}>Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            { borderColor: email.length > 0 ? '#757575' : '#DBDBDB' }
                        ]}
                        placeholder="Your email..."
                        placeholderTextColor='#757575'
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    >
                    </TextInput>

                    <Text style={styles.emailText}>Password</Text>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.passwordInput,
                                { borderColor: password.length > 0 ? '#757575' : '#DBDBDB' }
                            ]}
                            placeholder="Your password..."
                            placeholderTextColor='#757575'
                            keyboardType="default"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        >
                        </TextInput>
                        <TouchableOpacity
                            style={styles.passwordToggle}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={styles.passwordToggleText}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: areInputsFilled ? '#242528' : '#DBDBDB' }
                        ]}
                        disabled={!areInputsFilled || loading}
                        onPress={handleSignUp}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.contentText}>
                        By signing up, I agree to the GymSense{' '}
                        <Text style={[styles.contentText, { fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }]}>
                            Terms and Conditions
                        </Text>
                        {' '}and{' '}
                        <Text style={[styles.contentText, { fontFamily: 'Poppins-Bold', textDecorationLine: 'underline' }]}>
                            Privacy Policy
                        </Text>
                        .
                    </Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
    },
    logo: {
        height: 124,
        width: 124,
        marginVertical: 20,
    },
    welcomeText: {
        fontSize: 28,
        fontFamily: 'Poppins-Regular',
        lineHeight: 35,
        marginVertical: 10,
        marginBottom: 30,
    },
    emailText: {
        fontFamily: 'Poppins-Light',
        alignSelf: 'flex-start',
        fontSize: 14,
        lineHeight: 24,
        marginVertical: 10,
    },
    input: {
        borderRadius: 15,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        width: '100%',
        height: 55,
        padding: 12,
        fontFamily: 'Poppins-Regular',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        width: '100%',
        height: 55,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        borderWidth: 0,
        padding: 12,
        height: '100%',
    },
    passwordToggle: {
        paddingHorizontal: 15,
        height: '100%',
        justifyContent: 'center',
    },
    passwordToggleText: {
        color: '#050505',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 24,
    },
    button: {
        width: '100%',
        height: 55,
        borderRadius: 16,
        padding: 12,
        marginVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        lineHeight: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
    },
    contentText: {
        fontSize: 13,
        lineHeight: 24,
        fontFamily: "Poppins-Light",
        fontWeight: '300',
        alignSelf: 'flex-start',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    customHeader: {
        paddingHorizontal: 20,
        paddingTop: 10,
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 5,
    },
    backButtonImg: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
    contentArea: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
});
export default SignUp;