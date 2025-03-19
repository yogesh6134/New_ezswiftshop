import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IMAGES } from '../../assets';
import styles from './styles';

const Header = () => {
	const navigation = useNavigation()
	return (
		<View style={styles.headerStyle}>
			<MaterialCommunityIcons style={styles.menuIcon}
				size={25} name="menu"
				onPress={() => navigation.toggleDrawer()} />
			<Image style={styles.logo} source={IMAGES.EZSwiftType} />
			<View
				style={styles.rightSide}
			>
				<Icon style={styles.iconStyle}
					size={25} name="search" 
					onPress={() => navigation.navigate('App', { screen: 'HomeScreen', params: { screen: 'product', params: { screen: 'searchproduct' } } })} />
				<MaterialCommunityIcons
					onPress={() => navigation.navigate('App', { screen: 'HomeScreen', params: { screen: 'product', params: { screen: 'favourites' } } })}
					style={styles.iconStyle} size={25} name="heart" />
				<MaterialCommunityIcons style={styles.iconStyle} size={25} name="cart" onPress={() => navigation.navigate("App", { screen: 'Cart' })} />
			</View>
		</View>
	);
};


export default Header;
