import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";
import { APP_FONTS } from "../../../utils/fontFamily";

export default StyleSheet.create({
    fullContainer: {
        // padding:5
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        alignItems: "center",
        flex: 1,
        height: 370,
        width: 370,
        borderColor: COLORS.gray
    },
    nameStyle: {
        fontSize: 30,
        color: COLORS.secondary,
        fontFamily: APP_FONTS.PoppinsSemiBold
    },
    priceStyle: {
        color: COLORS.primary,
        fontSize: 25,
        fontFamily: APP_FONTS.PoppinsBold

    },
    shopStyle: {
        fontSize: 20,
        fontFamily: APP_FONTS.PoppinsRegular,
        color: COLORS.black
    },
    buttonStyle: {
        backgroundColor: COLORS.secondary,
        width: "60%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.gray,
        marginBottom: 30,
        margin: 10,
        elevation: 3

    },
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        height: '90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        alignItems: "center"
    },
    calendar: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 300
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,
        width: 200

    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})