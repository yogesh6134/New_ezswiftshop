import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from "../../utils/navigateTo";
import TabNavigation from "../TabNavigation";
import ProfileScreen from "../../Screen/Profile";
import { store } from "../../redux/store";
import BarberScreen from "../../Screen/Barber";
import ProductScreen from "../../Screen/ProductScreen/Product";
import LandingScreen from "../../Screen/Authentication/LandingScreen";
import LoginScreen from "../../Screen/Authentication/LoginScreen";
import DrawerScreen from "../DrawerStack";
import RegisterScreen from "../../Screen/Authentication/RegisterScreen";
import RegisterProfile from "../../Screen/Authentication/RegisterProfile";
import RoomPage from "../../Screen/BNBSCREEN/RoomPage";
import Paymentpage from "../../Screen/BNBSCREEN/Paymentpage";
import PaymentMethodHotel from "../../Screen/CartSecreen/PaymentMethodHotel";
import ThankYou from "../../Screen/CartSecreen/thankYou";
import Payment from "../../Screen/CartSecreen/Payment";
import PaymentMethod from "../../Screen/CartSecreen/PaymentMethod";
import BNBSearch from "../../Screen/BNBSCREEN/BNBSearch";
import Shop from "../../Screen/ShopScreen/Shop";
import ShopDetail from "../../Screen/ShopScreen/ShopDetail";
import SearchShop from "../../Screen/ShopScreen/SearchShop";
import ProductContent from "../../Screen/ProductScreen/ProductContent";
import ProductDetail from "../../Screen/ProductScreen/ProductDetail";
import ScanScreen from "../../Screen/ScanScreen";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import HostPage from "../../Screen/liveVideo/HostPage";
import AudiencePage from "../../Screen/liveVideo/AudiencePage";
import LiveVideo from "../../Screen/liveVideo";
import Wallet from "../../Screen/wallet/walletHome";
import AddPayment from "../../Screen/wallet/addMoney";
import ProductCategories from "../../Screen/ProductCategories/productCategories";
import CategoryProductsList from "../../Screen/ProductCategories/categoryProducts";
import ShopCategories from "../../Screen/ShopCategories/shopCategories";
import CategoryShopList from "../../Screen/ShopCategories/categoryShops";
import Cart from "../../Screen/CartSecreen/Cart";
import ShippingAddress from "../../Screen/CartSecreen/Address1";
import BillingAddress from "../../Screen/CartSecreen/Address2";
import Checkout from "../../Screen/CartSecreen/checkout";
import CartDetail from "../../Screen/CartSecreen/cartDetail";
import Failed from "../../Screen/CartSecreen/failed";
import Orders from "../../Screen/OrderScreen/Orders";
import OrderDetail from "../../Screen/OrderScreen/orderDetail";
import { BusinessDrawerNavigator } from "../BusinessRoutes";


const BNBStackNav = createNativeStackNavigator();
export const BNBStack = ({ navigation }) => {
  return (
    <BNBStackNav.Navigator
      initialRouteName="Search"
      screenOptions={
        {
          // headerShown: false
        }
      }>
      <BNBStackNav.Screen
        name="Search"
        component={BNBSearch}
        options={{
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HomeScreen');
                }}>
                <Icon
                  color="black"
                  name="arrow-back-outline"
                  size={30}
                  style={{}}
                />
              </TouchableOpacity>
              <Text style={{ color: 'black', padding: 5, fontSize: 20 }}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      <BNBStackNav.Screen name="RoomPage" component={RoomPage} />
      <BNBStackNav.Screen name="Paymentpage" component={Paymentpage} />
      <BNBStackNav.Screen name="PaymentMethod" component={PaymentMethod} />
      <BNBStackNav.Screen
        name="PaymentMethodHotel"
        component={PaymentMethodHotel}
      />
      <BNBStackNav.Screen
        name="payment"
        component={Payment}
        options={{ headerShown: false }}
      />
      <BNBStackNav.Screen
        name="thankYou"
        component={ThankYou}
        options={{ headerShown: false }}
      />
      {/* <BNBStackNav.Screen name="index" component={Index} /> */}
    </BNBStackNav.Navigator>
  );
};


const LiveStackNav = createNativeStackNavigator();
export const LiveStreameStack = () => {
  return (
    <LiveStackNav.Navigator screenOptions={{ headerShown: false }} >
      <LiveStackNav.Screen name='LiveVideo' component={LiveVideo} />
      <LiveStackNav.Screen options={{ headerShown: false }} name="HostPage" component={HostPage} />
      <LiveStackNav.Screen options={{ headerShown: false }} name="AudiencePage" component={AudiencePage} />
    </LiveStackNav.Navigator>
  );
}

const WalletStackNav = createNativeStackNavigator();
export const WalletStack = () => {
  return (
    <WalletStackNav.Navigator
      initialRouteName="wallet"
      screenOptions={{
        headerShown: false,
      }}>
      <WalletStackNav.Screen name="wallet" component={Wallet} />
      <WalletStackNav.Screen name="addMoney" component={AddPayment} />
    </WalletStackNav.Navigator>
  );
};

const ProductCategory = createNativeStackNavigator();
export const ProductCategoryStack = () => {
  return (
    <ProductCategory.Navigator
      initialRouteName="productCategories"
      screenOptions={{
        headerShown: false,
      }}>
      <ProductCategory.Screen
        name="productCategories"
        component={ProductCategories}
      />
      <ProductCategory.Screen
        name="categoryProducts"
        component={CategoryProductsList}
      />
      <ProductCategory.Screen name="productdetail2" component={ProductDetail} />
      <ProductCategory.Screen
        name="productContent"
        component={ProductContent}
      />
    </ProductCategory.Navigator>
  );
};


const ShopCategory = createNativeStackNavigator();
export const ShopCategoryStack = () => {
  return (
    <ShopCategory.Navigator
      initialRouteName="shopCategories"
      screenOptions={{
        headerShown: false,
      }}>
      <ShopCategory.Screen name="shopCategories" component={ShopCategories} />
      <ShopCategory.Screen name="categoryShops" component={CategoryShopList} />
      <ShopCategory.Screen name="shopdetail2" component={ShopDetail} />
      <ShopCategory.Screen name="productdetail3" component={ProductDetail} />
      <ShopCategory.Screen name="productContent4" component={ProductContent} />
    </ShopCategory.Navigator>
  );
};


const CartStackNav = createNativeStackNavigator();
export const CartStack = () => {
  return (
    <CartStackNav.Navigator
      initialRouteName="cart"
      screenOptions={{
        headerShown: false,
      }}>
      <CartStackNav.Screen name="cart" component={Cart} />
      <CartStackNav.Screen name="shipping" component={ShippingAddress} />
      <CartStackNav.Screen name="billing" component={BillingAddress} />
      <CartStackNav.Screen name="checkout" component={Checkout} />
      <CartStackNav.Screen name="cartDetail" component={CartDetail} />
      <CartStackNav.Screen name="payment" component={Payment} />
      <CartStackNav.Screen name="PaymentMethod" component={PaymentMethod} />
      <CartStackNav.Screen
        name="PaymentMethodHotel"
        component={PaymentMethodHotel}
      />
      <CartStackNav.Screen name="thankYou" component={ThankYou} />
      <CartStackNav.Screen name="failed" component={Failed} />
    </CartStackNav.Navigator>
  );
};

const Order = createNativeStackNavigator();
export const OrderStack = () => {
  return (
    <Order.Navigator
      initialRouteName="order"
      screenOptions={{
        headerShown: false,
      }}>
      <Order.Screen name="order" component={Orders} />
      <Order.Screen name="orderDetail" component={OrderDetail} />
    </Order.Navigator>
  );
};


const ShopStackNav = createNativeStackNavigator();
export const ShopStack = () => {
  return (
    <ShopStackNav.Navigator
      initialRouteName="shops"
      screenOptions={{
        headerShown: false,
      }}>
      <ShopStackNav.Screen name="shops" component={Shop} />
      <ShopStackNav.Screen name="shopdetail" component={ShopDetail} />
      <ShopStackNav.Screen name="productdetail1" component={ProductDetail} />
      <ShopStackNav.Screen name="searchShop" component={SearchShop} />
      <ShopStackNav.Screen name="productContent" component={ProductContent} />
    </ShopStackNav.Navigator>
  );
};

const Scan = createNativeStackNavigator();
export const ScanStack = () => {
  return (
    <Scan.Navigator
      initialRouteName="scan"
      screenOptions={{
        headerShown: false,
      }}>
      <Scan.Screen name="scan" component={ScanScreen} />
      <Scan.Screen name="productdetail" component={ProductDetail} />
      <Scan.Screen name="productContent" component={ProductContent} />
    </Scan.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const RouteStack = () => {
  const getStore = store.getState();
  const { token } = getStore?.AuthReducer?.loginData || ""
  // const {isLogedIn} = useAppSelector(AuthSelector);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Landing"
        // initialRouteName="BusinessApp"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen
          name={'App'}
          component={DrawerScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterProfile" component={RegisterProfile} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Barber" component={BarberScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="BusinessApp" component={BusinessDrawerNavigator} />
      </Stack.Navigator>
      <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
    </NavigationContainer>
  )
}

export default RouteStack;