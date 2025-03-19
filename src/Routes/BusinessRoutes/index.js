import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Import all your screens here
// import AddProduct from './products/AddProduct';
import AddProduct from '../../Screen/BusinessScreen/products/AddProduct';


import ShippedOrders from '../../Screen/BusinessScreen/shipped orders/ShippedOrdersForDelivery';
import ShippedOrderDetail from '../../Screen/BusinessScreen/shipped orders/ShippedOrderDetail';
import ActiveOrderDetail from '../../Screen/BusinessScreen/active orders/ActiveOrderDetail';
import BusinessOrders from '../../Screen/BusinessScreen/orders/OrdersForDelivery';
// import LiveStreame from './LiveStreame'
import Home from '../../Screen/BusinessScreen/Home';
import ActiveOrders from '../../Screen/BusinessScreen/active orders/ActiveOrdersForDelivery';

// ... import other screens similarly

// Stack and Tab Navigator Definitions
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



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
            <Icon name="home" color={color} size={25} />
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
            <Icon name="add" color={color} size={25} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="LiveStreame"
        component={LiveStreame}
        options={{
          tabBarLabel: 'Go Live',
          tabBarIcon: ({ color }) => (
            <Icon name="videocam" color={color} size={25} />
          ),
        }}
      /> */}
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
