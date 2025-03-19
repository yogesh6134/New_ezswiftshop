import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerScreen from '../../Screen/Customer';
import SocialScreen from '../../Screen/social';
import ProfileScreen from '../../Screen/Profile';
import BarberScreen from '../../Screen/Barber';
import ShopScreen from '../../Screen/ShopScreen';
import TabNavigation, { ProductStack } from '../TabNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../utils/color';
import { BNBStack, CartStack, LiveStreameStack, OrderStack, ProductCategoryStack, ShopCategoryStack, ShopStack, WalletStack } from '../RouteStack';
import Logout from '../../Screen/Authentication/Logout';
import Aboutus from '../../Screen/AboutUsScreen';
import BusinessLogin from '../../Screen/BusinessScreen/authentication/Login';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.primary,
                drawerActiveTintColor: COLORS.white,
                drawerInactiveTintColor: COLORS.white,
                drawerStyle: {
                    backgroundColor: 'rgba(00, 00, 00, 0.5)',
                },
            }}
            style={{
                backgroundColor: '#17baa1',
                fontSize: 25,
            }}>
            <Drawer.Screen
                name="HomeScreen"
                component={TabNavigation}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialCommunityIcons name="home" size={25} color={'#fff'} />
                    ),
                }}
            />

            <Drawer.Screen
              name="BNB"
              component={BNBStack}
              options={{
                // headerShown:true,
                drawerLabel: 'BNB',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="bed" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="Products"
              component={ProductStack}
              options={{
                drawerLabel: 'Products',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="basket" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
                name="Shops"
                component={ShopStack}
                options={{
                    drawerLabel: 'Shops',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialCommunityIcons
                            name="warehouse"
                            size={25}
                            color={'#fff'}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Barber"
                component={BarberScreen}
                options={{
                    drawerLabel: 'Barber',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialCommunityIcons name="sale" size={25} color={'#fff'} />
                    ),
                }}
            />

            <Drawer.Screen
              name="Product Categories"
              component={ProductCategoryStack}
              options={{
                drawerLabel: 'Product Categories',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="sale" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="Shop Categories"
              component={ShopCategoryStack}
              options={{
                drawerLabel: 'Shop Categories',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="store" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="Cart"
              component={CartStack}
              options={{
                drawerLabel: 'Cart',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="cart" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerLabel: 'Profile',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={25}
                            color={'#fff'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
              name="Wallet"
              component={WalletStack}
              options={{
                drawerLabel: 'Wallet',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="wallet" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="Orders"
              component={OrderStack}
              options={{
                drawerLabel: 'Orders',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons
                    name="receipt"
                    size={25}
                    color={'#fff'}
                  />
                ),
              }}
            />
           
            <Drawer.Screen
                name="Live Video"
                component={LiveStreameStack}
                options={{
                    drawerLabel: 'Live Video',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialIcons name="business-center" size={25} color={'#fff'} />
                    ),
                }}
            />


            <Drawer.Screen
                name="Social"
                component={SocialScreen}
                options={{
                    drawerLabel: 'Social',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialIcons name="business-center" size={25} color={'#fff'} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Customer"
                component={CustomerScreen}
                options={{
                    drawerLabel: 'Customer',
                    drawerIcon: ({ tintColor }) => (
                        <MaterialIcons name="business-center" size={25} color={'#fff'} />
                    ),
                }}
            />


            <Drawer.Screen
              name="Business"
              component={BusinessLogin}
              options={{
                drawerLabel: 'Business',
                drawerIcon: ({ tintColor }) => (
                  <MaterialIcons name="business-center" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="Logout"
              component={Logout}
              options={{
                drawerLabel: 'Logout',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons name="logout" size={25} color={'#fff'} />
                ),
              }}
            />
            <Drawer.Screen
              name="About us"
              component={Aboutus}
              options={{
                drawerLabel: 'About us',
                drawerIcon: ({ tintColor }) => (
                  <MaterialCommunityIcons
                    name="information"
                    size={25}
                    color={"#fff"}
                  />
                ),
              }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerScreen;