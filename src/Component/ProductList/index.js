import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import { navigateTo } from '../../utils/navigateTo';

const ListProductItem = ({ data }) => {
    return (
        <TouchableOpacity onPress={() => navigateTo('ProductDetail', { url: data.item.url })}>
            <View style={styles.viewStyle}>
                <View style={styles.viewStyle2}>
                    <View>
                        <Image style={styles.imagStyle}
                            source={{ uri: data.item.product_image }} />
                    </View>
                    <View style={styles.detailStyle}>
                            <Text style={styles.textStyle}>{data.item.product_name}</Text>
                            <Text style={styles.textStyle2}>${data.item.product_price}</Text>
                            <Text style={styles.textStyle3}>{data.item.shop_name.shop_name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListProductItem;