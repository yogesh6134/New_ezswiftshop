import React, { useEffect, useState } from 'react';
import { FlatList, Image, Share, Text, TouchableOpacity, View } from 'react-native';
import { navigateTo, resetNavigation } from '../../utils/navigateTo';
import { setCustomDrawerItem } from '../../redux/slice/commonAction';
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS } from '../../utils/color';
import styles from './styles';
import { ProfileSelector } from '../../redux/slice/profileSlice';
import DrawerList from '../../mockData/drawerName';
import commonStyle from '../../utils/commonStyle';
import { useAppDispatch } from '../../redux/hooks';
import { AutoLoginData } from '../../redux/slice/onBoardingSlice';

const CustomDrawerHeader = ({toggleDrawer}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.button}
        onPress={() => toggleDrawer(false)}
      >
        <Icon name='cross' size={30} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const dispatch = useAppDispatch()


  const onShare = async () => {
    console.log('object share app')
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handlePress = (item) => {
    switch (item) {
      case 'PROFILE':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('LiveTv');
        navigateTo('Profile')
        break;
      case 'SUBSCRIPTION':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('MoviesAndVideo');
        break;
      case 'PRIVACY POLICY':
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('Home'); 
        break;
      case 'SHAE APP':
        // dispatch(fetchPolicy())
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('TermsScreen', { type: item });
        onShare()
        break;
        case 'LOG OUT' :
          dispatch(AutoLoginData())
          setTimeout(() => {
            resetNavigation('Login')
          }, 100)
          break;
      default:
        // dispatch(setCustomDrawerItem(item));
        // props.setShowDrawer(false);
        // navigateTo('RateApp', { name: item });
        break;
    }
  };

  const renderDrawerItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => handlePress(item.name)}
      >
        <View style={commonStyle.row}>
          <Image source={item.img} style={styles.itemIcon} resizeMode='contain' />
        <Text style={styles.listText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomDrawerHeader toggleDrawer={props.setShowDrawer}/>
      <View style={styles.drawerItemsContainer}>
        <FlatList
          data={DrawerList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDrawerItem}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={dynamicStyles.drawerContent}
        />
      </View>
    </View>
  );
};



export default CustomDrawerContent;
