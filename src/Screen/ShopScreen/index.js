import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Header from '../../component/Header';

const ShopScreen = () => (
    <View style={styles.container}>
       <Header />

        <Text style={{color: 'red'}}>ShopScreen</Text>
    </View>
);

export default ShopScreen;
