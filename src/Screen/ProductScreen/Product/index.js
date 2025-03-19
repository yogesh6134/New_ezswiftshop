import React, { useActionState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Button, ActivityIndicator, StatusBar } from 'react-native';
import axios from 'axios';
import styles from './styles';
import ListProductItem from '../../../Component/ProductList';
import Header from '../../../Component/Header';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts, ProductSelector } from '../../../redux/slice/ProductReducer';

const ProductList = () => {
    const dispatch = useAppDispatch()
    const { ProductList } = useAppSelector(ProductSelector)

    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={ProductList}
                keyExtractor={item => item.product_id}
                renderItem={item => {
                    return (
                        <ListProductItem
                            data={item}
                        />)
                }}
            />
        </View>
    )
}

export default ProductList;
