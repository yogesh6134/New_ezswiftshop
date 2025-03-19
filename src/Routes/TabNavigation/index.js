import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";
import HomeScreen from "../../Screen/HomeScreen";
import ProductScreen from "../../Screen/ProductScreen/Product";
import ShopScreen from "../../Screen/ShopScreen";
import ScanScreen from "../../Screen/ScanScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../utils/color";
import { HEIGHT, FONTS, SPACING, WIDTH } from "../../utils/dimension";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import ProductDetail from "../../Screen/ProductScreen/ProductDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favourite from "../../Screen/ProductScreen/Favourite";
import ProductContent from "../../Screen/ProductScreen/ProductContent";
import ListProductItem from "../../Screen/ProductScreen/ListProductItem";
import SearchProduct from "../../Screen/ProductScreen/SearchProduct";
import { ScanStack, ShopStack } from "../RouteStack";

const Product = createNativeStackNavigator();
export const ProductStack = () => {
  return (
    <Product.Navigator
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}>
      <Product.Screen name="index" component={ProductScreen} />
      <Product.Screen name="searchproduct" component={SearchProduct} />
      <Product.Screen name="ProductDetail" component={ProductDetail} />
      <Product.Screen name="productContent" component={ProductContent} />
      <Product.Screen name="favourites" component={Favourite} />

      <Product.Screen name="ListProductItem" component={ListProductItem} />
    </Product.Navigator>
  );
};


const Tab = createBottomTabNavigator();
const getIconName = (name) => {
  switch (name) {
    case "Home":
      return "home";
    case "Product":
      return "basket";
    case "Shop":
      return "store";
    case "Scan":
      return "qrcode-scan";
    default:
      return "home";
  }
};

const TabIcon = ({ name, focused }) => {
  const scale = useSharedValue(focused ? 1.2 : 1);
  const color = focused ? COLORS.primary : COLORS.white;

  // Animated style for smooth scaling transition
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      <MaterialCommunityIcons name={name} size={30} color={color} />
    </Animated.View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.black,
          height: HEIGHT.h07,
          borderTopWidth: 0,
          justifyContent: 'center',
          borderTopLeftRadius: HEIGHT.h07 / 2,
          borderTopRightRadius: HEIGHT.h07 / 2,

          // marginBottom: 5
        },
      }}
    >
      {["Home", "Product", "Shop", "Scan"].map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab}
          component={
            tab === "Home"
              ? HomeScreen
              : tab === "Product"
              // ? ProductScreen
              ? ProductStack
              : tab === "Shop"
              ? ShopStack
              : ScanStack
          }
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.activeTab : styles.inActiveTab}>
                <TabIcon name={getIconName(tab)} focused={focused} />
                <Text style={focused ? styles.activelabel : styles.inActivelabel}>
                  {tab}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    alignItems: "center",
    borderTopColor: COLORS.transparent,
    width: WIDTH.w20,
    // borderRadius: HEIGHT.h08 / 2,
    position: "absolute",
    top: 0,
  },
  inActiveTab: {
    alignItems: "center",
    width: WIDTH.w20,
    position: "absolute",
    top: 0,

  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  activelabel: {
    color: COLORS.primary,
    marginVertical: SPACING.sh05,
    fontSize: FONTS.f14,
  },
  inActivelabel: {
    marginVertical: SPACING.sh05,
    fontSize: FONTS.f14,
    color: COLORS.white,
  },
});

export default TabNavigation;


// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Text, View, StyleSheet } from "react-native";
// import HomeScreen from "../../Screen/HomeScreen";
// import ProductScreen from "../../Screen/ProductScreen";
// import ShopScreen from "../../Screen/ShopScreen";
// import ScanScreen from "../../Screen/ScanScreen";
// import LottieView from "lottie-react-native";
// import { COLORS } from "../../utils/color";
// import { HEIGHT, FONTS, SPACING, WIDTH } from "../../utils/dimension";

// const Tab = createBottomTabNavigator();

// const getLottieSource = (name) => {
//   switch (name) {
//     case "Home":
//       return require("../../assets/homeIcon.png");
//     case "Product":
//       return require("../../assets/homeIcon.png");
//     case "Shop":
//       return require("../../assets/homeIcon.png");
//     case "Scan":
//       return require("../../assets/homeIcon.png");
//     default:
//       return require("../../assets/homeIcon.png");
//   }
// };

// const TabIcon = ({ name, focused }) => {
//   return (
//     <View style={styles.iconContainer}>
//       <LottieView
//         source={getLottieSource(name)}
//         autoPlay
//         loop={focused}
//         style={styles.lottieIcon}
//       />
//     </View>
//   );
// };

// const TabNavigation = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: COLORS.primary,
//           height: HEIGHT.h08,
//           borderTopWidth: 0,
//           justifyContent: 'center',
//         },
//       }}
//     >
//       {["Home", "Product", "Shop", "Scan"].map((tab, index) => (
//         <Tab.Screen
//           key={index}
//           name={tab}
//           component={
//             tab === "Home"
//               ? HomeScreen
//               : tab === "Product"
//               ? ProductScreen
//               : tab === "Shop"
//               ? ShopScreen
//               : ScanScreen
//           }
//           options={{
//             tabBarLabel: () => null,
//             tabBarIcon: ({ focused }) => (
//               <View style={focused ? styles.activeTab : styles.inActiveTab}>
//                 <TabIcon name={tab} focused={focused} />
//                 <Text style={focused ? styles.activelabel : styles.inActivelabel}>
//                   {tab}
//                 </Text>
//               </View>
//             ),
//           }}
//         />
//       ))}
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   activeTab: {
//     alignItems: "center",
//     borderTopColor: COLORS.white,
//     width: WIDTH.w20,
//     position: "absolute",
//     top: 0,
//   },
//   inActiveTab: {
//     alignItems: "center",
//     width: WIDTH.w20,
//     position: "absolute",
//     top: 0,
//   },
//   iconContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lottieIcon: {
//     width: 50,
//     height: 50,
//   },
//   activelabel: {
//     color: COLORS.activeText,
//     marginVertical: SPACING.sh05,
//     fontSize: FONTS.f14,
//   },
//   inActivelabel: {
//     marginVertical: SPACING.sh05,
//     fontSize: FONTS.f14,
//     color: COLORS.white,
//   },
// });

// export default TabNavigation;