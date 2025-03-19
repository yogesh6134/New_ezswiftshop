import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigateBack, navigateTo } from '../../../utils/navigateTo';

export default class OrderHeader extends React.Component {
    refreshfun = () => {
        this.props.Fun();
    };

    render() {
        return (
            <Appbar.Header style={styles.headerStyle}>
                <Appbar.Action
                    icon={() => (
                        <MaterialCommunityIcons name="arrow-left" size={25} color="white" />
                    )}
                    onPress={() => navigateBack()}
                />
                <TouchableOpacity onPress={this.props.Fun}>
                    <MaterialCommunityIcons name="reload" size={25} color="white" style={styles.iconStyle} />
                </TouchableOpacity>
            </Appbar.Header>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconStyle: {
        padding: 12,
    },
});
