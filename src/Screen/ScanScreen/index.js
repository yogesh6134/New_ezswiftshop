import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import QRScanner from "../../component/QRScanner";
import { COLORS } from "../../utils/color";
import Header from "../../component/Header";
const dWidth = Dimensions.get("window").width;

const clr1 = "mediumseagreen";

const ScanScreen = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = (qrtext) => {
    setQrCode(qrtext);
    setShowQR(false);
  };

  return (
    <View style={styles.page}>
        <Header />
      {qrCode ? (
        <Text style={{ fontSize: 16, color: "black" }}>
          {"QR Value \n" + qrCode}
        </Text>
      ) : null}
      <Ionicons
        name={"scan-circle-outline"}
        size={qrCode ? dWidth * 0.4 : dWidth * 0.75}
        color={COLORS.primary}
      />
      <TouchableOpacity onPress={() => openQRscanner()} style={styles.btn}>
        <Text style={{ color: COLORS.primary }}>Scan QR</Text>
      </TouchableOpacity>
      {showQR ? <QRScanner onRead={onQrRead} /> : null}
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    // justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: "3%",
    width: "50%",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  btnText: {
    color: clr1,
  },
});

