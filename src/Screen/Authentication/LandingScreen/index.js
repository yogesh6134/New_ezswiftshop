

import React, { useCallback } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { IMAGES } from '../../../assets';
import { navigateTo } from '../../../utils/navigateTo';
import { COLORS } from '../../../utils/color';

const LandingScreen = ({navigation}) => {
    const onNextScreenHandler = useCallback((type) => {
        if (type === 'Product'){
            navigateTo('App', { screen: 'Product' })
        }
        else if (type === 'Shop'){
            navigateTo('App', { screen: 'Shop' })
        }
        else {
        navigateTo(type)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={IMAGES.EZSwiftType} />
            <View style={styles.main}>
                <Animatable.View animation="bounceInDown" style={styles.box}>
                    <TouchableOpacity onPress={() => onNextScreenHandler('Product') }>
                        <MaterialCommunityIcons name='shopping' color={COLORS.primary} size={150} />
                        <Text style={styles.textStyle}>Products</Text>
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View animation="bounceInLeft" style={[styles.box, { borderColor: COLORS.primary }]} >
                    <TouchableOpacity onPress={() => onNextScreenHandler('Shop')}>
                        <MaterialCommunityIcons name='store' color='#17baa1' size={150} />
                    </TouchableOpacity>
                    <Text style={[styles.textStyle, { color: COLORS.primary }]}>Shops</Text>
                </Animatable.View>
                <Animatable.View animation="bounceInRight" style={styles.box}>
                    <TouchableOpacity onPress={() => onNextScreenHandler('Login')}>
                        <MaterialCommunityIcons name='login' color='black' size={150} />
                    </TouchableOpacity>
                    <Text style={styles.textStyle}>Login</Text>
                </Animatable.View>
            </View>
        </View>

    )

};




export default LandingScreen