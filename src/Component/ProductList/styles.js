import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    viewStyle: {
        backgroundColor: COLORS.gray,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 1,
        paddingVertical: 10,
        borderRadius: 15

    },
    viewStyle2: {
        flexDirection: "row"
    },
    imagStyle: {
        height: 130,
        width: 150,
        borderColor: COLORS.white,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 10,
    },
    detailStyle: {
        justifyContent: "center",
    },
    textStyle: {
        color: COLORS.black,
        fontSize: 20,
        fontFamily: APP_FONTS.PoppinsMedium
    },
    textStyle2: {
        color: COLORS.primary,
        fontSize: 20,
        fontFamily: APP_FONTS.PoppinsMedium
    },
    textStyle3: {
        color: COLORS.black,
        fontSize: 18,
        fontFamily: APP_FONTS.PoppinsRegular
    }
})