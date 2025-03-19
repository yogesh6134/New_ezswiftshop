import React, { useState, useCallback } from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../utils/color';
import styles from './styles';
import { fetchRegister } from '../../../redux/slice/onBoardingSlice';
import { useAppDispatch } from '../../../redux/hooks';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const dispatch = useAppDispatch()

    const registerUser = useCallback(() => {
        const data = {
            username,
            email,
            password,
            confirm_password
        }
        dispatch(fetchRegister(data))
    }, [])

        return (
            <View style={styles.viewStyle}>
                <Animatable.View animation='fadeInDownBig'
                    style={styles.headerStyle}>
                    <Text style={styles.headerTextStyle}>Register Here</Text>
                </Animatable.View>
                <Animatable.View animation="fadeInUpBig" style={styles.footerStyle}>
                    <Text style={styles.textStyle}>Sign Up</Text>
                    <TextInput style={styles.textInput1}
                        onChangeText={setUsername}
                        placeholderTextColor={COLORS.gray}
                        placeholder="Username"
                        value={username} />

                    <TextInput style={styles.textInput1}
                        onChangeText={setEmail}
                        placeholderTextColor={COLORS.gray}
                        placeholder="Email"
                        value={email} />

                    <TextInput secureTextEntry={true}
                        style={styles.textInput1}
                        onChangeText={setPassword}
                        placeholderTextColor={COLORS.gray}
                        placeholder="Password"
                        value={password} />

                    <TextInput secureTextEntry={true}
                        style={styles.textInput1}
                        onChangeText={setConfirm_password}
                        placeholderTextColor={COLORS.gray}
                        placeholder="Confirm Password"
                        value={confirm_password} />
                    <TouchableOpacity style={styles.buttonStyle} >
                        <Button
                            onPress={registerUser}
                            color={COLORS.primary}
                            title="Register" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2Style} >
                        <Button
                            onPress={() => { navigation.navigate("Login") }}
                            color={COLORS.secondary}
                            title="Login" />
                    </TouchableOpacity>
                </Animatable.View>
            </View>

        )
    }

export default RegisterScreen