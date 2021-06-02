import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import firebase from 'firebase'
import { setUser } from "../redux/actions";
import { useDispatch } from "react-redux";

const AuthScreen = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginIndicator, setLoginIndicator] = useState(false);
    const [isSignUpIndicator, setSignUpIndicator] = useState(false);
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        if (password.length < 6) {
            Alert.alert("Şifre en az 6 karakter olmalıdır");
            return;
        }
        setSignUpIndicator(true);
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            alert("Üyelik başarıyla oluşturuldu. Giriş yapabilirsiniz!")
        } catch (error) {
            alert("Giriş bilgileri yanlış!")
        }

        setSignUpIndicator(false);
    }

    const handleLogin = async () => {
        if (password.length < 6) {
            Alert.alert("Şifre en az 6 karakter olmalıdır");
            return;
        }

        setLoginIndicator(true);
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(setUser(user));
            navigation.navigate('Main');
        } catch (error) {
            alert("Giriş bilgileri yanlış!")
        }

        setLoginIndicator(false);
    }

    return (
        <View style={styles.loginContainer}>
            <TextInput
                autoCapitalize='none'
                placeholder="Email"
                autoFocus
                style={styles.emailInput}
                onChangeText={text => setEmail(text)}
            />
            <TextInput

                secureTextEntry={true}
                placeholder="Şifre"
                autoFocus
                style={styles.passwordInput}
                onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity
                onPress={() => { handleLogin() }}
                style={styles.submitButton}
                disabled={isLoginIndicator}
            >
                {isLoginIndicator && < ActivityIndicator size="small" color="white" />}
                <Text style={styles.submitText}>
                    Giriş Yap
          </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={styles.submitButton}
            >
                {isSignUpIndicator && < ActivityIndicator size="small" color="white" />}
                <Text style={styles.submitText}>
                    Üye Ol
          </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthScreen;

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    emailInput: {
        borderWidth: 1,
        borderColor: "#5ce0e9",
        color: "black",
        fontSize: 25,
        marginHorizontal: 20,
        padding: 10
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: "#5ce0e9",
        color: "black",
        fontSize: 25,
        marginHorizontal: 20,
        padding: 10,
        marginTop: 25,
    },
    submitButton: {
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        backgroundColor: "#25aae1",
        padding: 5,
        height: 60,
        width: 150,
        justifyContent: 'center',
        flexDirection: "row",
    },
    submitText: {
        alignSelf: "center",
        color: "white",
        fontWeight: "800",
        padding: 5,
        fontSize: 20,
    },
});