import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import all your screens here
import ProductList from './products/product';
import ProductDetail from './products/ProductDetail';
import Login from './authentication/Login';
import AuthLoadingScreen from './authentication/LoadingScreen';
import Logout from './authentication/Logout';
import AddProduct from './products/AddProduct';
import ShopProfile from './shop/Profile';
import Account from './shop/Account';
import ProfileEdit from './shop/ProfileEdit';
import Home from './index';

import ActiveOrders from './active orders/ActiveOrdersForDelivery';
import ShippedOrders from './shipped orders/ShippedOrdersForDelivery';
import ShippedOrderDetail from './shipped orders/ShippedOrderDetail';
import ActiveOrderDetail from './active orders/ActiveOrderDetail';
import CreateShop from './superuser/createUser';
import CreateShopProfile from './superuser/createdUserShopProfileCreate';
import SuperUser from './superuser/superUser';
import SHOPS from './superuser/shops/shopList';
import ShopProductList from './superuser/shops/ShopProductList';
import ShopProductDetail from './superuser/shops/ShopProductDetail';
import ShopAddProduct from './superuser/shops/ShopAddProduct';
import ShopDetail from './superuser/shops/shopsDetail';
import CreateCategory from './superuser/createCategory';
import CreateShopCategory from './superuser/shopCategory';
import ProductContent from './products/productContent';
import AddProductImages from './products/addProductImages';
import DeliveryUserCreate from './superuser/delivery/deliveryUserCreate';
import CreateDeliveryProfile from './superuser/delivery/deliveryUserProfileCreate';
import DeliveryUsers from './superuser/delivery/deliveryUserList';
import DeliveryProfileRUD from './superuser/delivery/deliveryUserProfile';
import ProductContentCategory from './products/productContentCategory';
import ProductContentCategoryEdit from './products/productContentCategoryEdit'
import ProductBarcode from './products/productBarcode';
import ProductTaxes from './products/productTaxes';
import CollectorUserCreate from './superuser/collector/collectorUserCreate';
import CreateCollectorProfile from './superuser/collector/collectorUserProfileCreate';
import CollectorUsers from './superuser/collector/collectorUserList';
import CollectorProfileRUD from './superuser/collector/collectorUserProfile';
import Wallet from './wallet/walletHome';
import AddMoney from './wallet/addMoney';
import PayMoney from './wallet/payMoney';
import Aboutus from './about';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookCount from './BNB/BookCount';
import Alllist from './BNB/Alllist';
import ViewHistory from './BNB/ViewHistory';
import CreatNewHotels from './BNB/CreatNewHotels';
import CreateUserBNB from './BNB/CreateUserBNB';
import AllHotels from './BNB/AllHotels';
import AllHotelDetails from './BNB/AllHotelDetails';
import UpdateBookCount from './BNB/UpdateBookCount';
import EditAllHotelDetails from './BNB/EditAllHotelDetails';
import HotelListItem from './BNB/HotelListItem';
import Bookinglist from './BNB/Bookinglist';
import HotelListItem1 from './BNB/HotelListItem1';
import Booking from './BNB/Booking';
import BookingList from './BNB/Bookinglist';
import BusinessOrders from './orders/OrdersForDelivery';
import LiveStreame from './LiveStreame'
import LivePage from './LivePage';

// ... import other screens similarly

// Stack and Tab Navigator Definitions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Define Home Stack
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}


// Define Live streame Stack
// function LiveStreameStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }} >
//       {/* Ensure component imports are correct */}
//       <Stack.Screen
//         name="LiveStreame"
//         component={LiveStreame}
//         options={{ title: 'Live Stream' }} // Optional title for clarity
//       />
//       <Stack.Screen
//         name="LivePage"
//         component={LivePage}
//         options={{ title: 'Live Page' }} // Optional title for clarity
//       />
//     </Stack.Navigator>
//   );
// }

// Define Account Stack
function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopProfile" component={ShopProfile} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}


const ActiveStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="active"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="active" component={ActiveOrders} />
      <Stack.Screen name="activeDetail" component={ActiveOrderDetail} />
    </Stack.Navigator>
  );
};

const ShippedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="shipped"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="shipped" component={ShippedOrders} />
      <Stack.Screen name="shippedDetail" component={ShippedOrderDetail} />
    </Stack.Navigator>
  );
};


// Define Tab Navigator
function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarActiveBackgroundColor: 'orange',
        tabBarInactiveBackgroundColor: '#17baa1',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="md-home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="BusinessOrders"
        component={BusinessOrders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => (
            <Icon name="md-add" color={color} size={25} />
          ),
        }}
      />

      <Tab.Screen
        name="LiveStreame"
        component={LiveStreame}
        options={{
          tabBarLabel: 'Go Live',
          tabBarIcon: ({ color }) => (
            <Icon name="videocam" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Define Drawer Navigator
export function BusinessDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='BusinessHome'
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#17baa1' },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerActiveBackgroundColor: 'orange',
      }}>
      <Drawer.Screen
        name="BusinessHome"
        component={TabStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ActiveOrders"
        component={ActiveStack}
        options={{
          drawerLabel: 'Active Orders',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="clock" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ShippedOrders"
        component={ShippedStack}
        options={{
          drawerLabel: 'Dispatched Orders',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="check" size={25} color={color} />
          ),
        }}
      />
      {/* Add other drawer screens similarly */}
    </Drawer.Navigator>
  );
}

// Root Stack for handling authentication flow
// const RootStack = createStackNavigator();

// function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator screenOptions={{ headerShown: false }}>
//         <RootStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
//         <RootStack.Screen name="App" component={DrawerNavigator} />
//         <RootStack.Screen name="Auth" component={Login} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default RootNavigator;
