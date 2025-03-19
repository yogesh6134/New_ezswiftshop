import React, { useEffect } from 'react';
import { Text, View, FlatList, ScrollView, Image } from 'react-native';
import styles from './styles';
import Header from '../../Component/Header';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ListProductItem from '../../Component/ProductList';
import { fetchProducts, ProductSelector } from '../../redux/slice/ProductReducer';
import { IMAGES } from '../../assets';



const HomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { ProductList } = useAppSelector(ProductSelector) || []

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      <Image source={IMAGES.hiclipart4} style={{height: 200, width: 300 , alignSelf: 'center'}} resizeMode='contain' />
      <Text style={styles.heading}>Products</Text>
      <FlatList
        data={ProductList.slice(1)}
        keyExtractor={item => item.product_id}
        renderItem={item => {
          return (
            <ListProductItem
              data={item}
            />)
        }}
      />
      <Text style={styles.heading}>Shop</Text>
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
</ScrollView>
    </View>
  );
};

export default HomeScreen;
