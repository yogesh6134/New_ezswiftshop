import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigateBack } from '../../../utils/navigateTo';

export default class OrderHeader extends React.Component {
    refreshfun = () => {
        this.props.Fun();
    };

    render() {
        return (
            <Appbar.Header style={styles.headerStyle}>
                <TouchableOpacity onPress={() => { navigateBack() }}>
                    <MaterialCommunityIcons style={styles.iconStyle} size={25} name="arrow-left" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.Fun}>
                    <MaterialCommunityIcons style={styles.iconStyle} size={25} name="reload" />
                </TouchableOpacity>
            </Appbar.Header>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    iconStyle: {
        color: "white",
        padding: 12
    }
});
