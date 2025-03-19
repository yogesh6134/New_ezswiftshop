import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import OrderProductListItem from "./orderProductListItem";
import { Card, Button, List } from 'react-native-paper';

class CartList extends React.Component {
    state = {
        data: this.props.data,
        cart: this.props.data.cart,
        order_preparation_time: "",
        token: "",
        loading: false,
        delivery_schedule: "No Schedule",
        date: new Date(),
        mode: 'date',
        show: false,
        deliveryDate: ""
    };

    componentDidMount() {
        this.getTokenhandler();
    }

    async getTokenhandler() {
        let token = await AsyncStorage.getItem('token');
        this.setState({ token: token });
    }

    AcceptOrderHandler = async () => {
        this.setState({ loading: true });
        let token = await AsyncStorage.getItem('token');
        let res = await axios.get(`${this.state.data.accept_order}?order_preparation_time=${this.state.order_preparation_time}`, {
            headers: { Authorization: token }
        });
        this.setState({ loading: false });
        this.props.fun();
    };

    RejectOrderHandler = async () => {
        this.setState({ loading: true });
        let token = await AsyncStorage.getItem('token');
        let res = await axios.get(this.state.data.cancel_order, {
            headers: { Authorization: token }
        });
        this.setState({ loading: false });
        this.props.fun();
    };

    onChange = (event, selectedDate) => {
        this.setState({ show: false });
        const currentDate = selectedDate || this.state.date;
        this.setState({
            date: currentDate,
            order_preparation_time: `${currentDate.getHours()}:${currentDate.getMinutes()}`
        });
    };

    showTimepicker = () => {
        this.setState({ show: true, mode: 'time' });
    };

    productMapHandler() {
        return <OrderProductListItem data={this.props.data} />;
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.activityContainer}>
                    <ActivityIndicator size="large" color="#17baa1" />
                    <StatusBar barStyle="default" />
                </View>
            );
        }

        return (
            <Card style={{ margin: 10, padding: 10 }}>
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button mode="contained" onPress={this.AcceptOrderHandler} icon="check" style={styles.buttonStyle}>
                            Accept
                        </Button>
                        <Button mode="contained" onPress={this.RejectOrderHandler} icon="close" style={styles.buttonStyle2}>
                            Reject
                        </Button>
                    </View>

                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <Text style={{ fontSize: 20, color: "#17baa1" }}>Order Ready At</Text>
                        <TouchableOpacity onPress={this.showTimepicker} style={styles.ScheduleStyle}>
                            <Text>{this.state.order_preparation_time || "Select Time"}</Text>
                        </TouchableOpacity>
                    </View>

                    <List.Section>
                        <List.Item title="Order ID" description={this.state.data.order_id} left={() => <List.Icon icon="identifier" />} />
                        <List.Item title="Ordered" description={this.state.data.ordered_date} left={() => <List.Icon icon="calendar" />} />
                        <List.Item title="Delivery Schedule" description={this.state.data.delivery_schedule} left={() => <List.Icon icon="truck" />} />
                        {this.state.data.appointment_id && (
                            <>
                                <List.Item title="Appointment Booked" description="Booked" left={() => <List.Icon icon="clipboard-check" />} />
                                <List.Item title="Appointment Date" description={this.state.data.appointment_id.appointment_date} left={() => <List.Icon icon="calendar" />} />
                                <List.Item title="Appointment Time" description={this.state.data.appointment_id.appointment_time} left={() => <List.Icon icon="clock" />} />
                            </>
                        )}
                    </List.Section>

                    {this.productMapHandler()}

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.SummaryStyle}>Order Summary</Text>
                        <List.Item title="Total Items" description={this.state.cart.total_items} left={() => <List.Icon icon="basket" />} />
                    </View>

                    {this.state.show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                        />
                    )}
                </Card.Content>
            </Card>
        );
    }
}

export default CartList;

const styles = {
    activityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: "#17baa1",
        margin: 5
    },
    buttonStyle2: {
        backgroundColor: "red",
        margin: 5
    },
    ScheduleStyle: {
        backgroundColor: "#eee",
        width: "70%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "grey",
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5
    },
    SummaryStyle: {
        fontSize: 18,
        color: "grey",
        fontWeight: "bold",
        marginVertical: 10
    }
};
