import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'black' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons style={{ color: 'white', padding: 12 }} size={25} name="arrow-left" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ alignItems: 'flex-end', backgroundColor: 'black', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('edit')}>
            <MaterialCommunityIcons name="pencil" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black' }}>
          <Image style={styles.imgStyle} source={{ uri: '' }} />
        </View>
        <View style={{ padding: 5, alignItems: 'center', backgroundColor: 'black' }}>
          <Text style={styles.textStyle}>{'Shop Name'}</Text>
          <Text style={styles.textStyle}>{'email-address'}</Text>
        </View>
        <View style={{ backgroundColor: '#fff', margin: 7, elevation: 3 }}>
          <List.Item
            title="Address"
            titleStyle={{ fontSize: 20, color: '#17baa1' }}
          />
          <View style={{ padding: 20, alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 20, color: 'orange' }}>{'address_line_1'},</Text>
            <Text style={{ fontSize: 20, color: 'orange' }}>{'address_line_2'},</Text>
            <Text style={{ fontSize: 20, color: 'orange' }}>{'town_city'}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', padding: 10, margin: 5 }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 25, color: '#17baa1' }}>Super User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = {
  imgStyle: {
    height: 250,
    width: 250,
    borderRadius: 400 / 2,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: '#fff',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
};