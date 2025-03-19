import React from "react";
import { View, Text, FlatList } from "react-native";
import { ProgressBar } from "react-native-paper";
import styles from "./styles";
import { COLORS } from "../../utils/color";
import Header from "../../component/Header";

const orderStatus = [
    { id: "1", status: "Order Placed", time: "10:00 AM" },
    { id: "2", status: "Order Confirmed", time: "10:30 AM" },
    { id: "3", status: "Out for Delivery", time: "12:00 PM" },
    { id: "4", status: "Delivered", time: "2:00 PM" },
];

const CustomerScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.main}>
                <Text style={styles.header}>Order Tracking</Text>
                <ProgressBar progress={0.75} color={COLORS.primary} style={styles.progressBar} />
                <FlatList
                    data={orderStatus}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.statusItem}>
                            <Text style={styles.statusText}>{item.status}</Text>
                            <Text style={styles.timeText}>{item.time}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};


export default CustomerScreen;