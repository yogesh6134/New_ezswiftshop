import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";

export default StyleSheet.create({
    activityStyle: {
        padding: 30,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        borderColor: COLORS.secondary
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    headerStyle: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextStyle: {
        fontSize: 40,
        color: COLORS.white,
        alignItems: 'flex-start',
        marginRight: 100
    },
    footerStyle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    imageStyle: {
        height: 150,
        width: 150
    },
    textStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: COLORS.primary
    },

    textInput1: {
        padding: 10,
        margin: 10,
        width: "90%",
        height: 40,
        borderColor: COLORS.primary,
        color: COLORS.black,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderRadius: 5

    },
    buttonStyle: {
        color: COLORS.black,
        width: "90%",
        height: 40,
    },
    button2Style: {
        color: COLORS.black,
        width: "90%",
        marginTop: 10,
        height: 40,


    }
})