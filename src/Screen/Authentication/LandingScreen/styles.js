import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";
import { APP_FONTS } from "../../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 300,
        height: 60
    },
    textStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontFamily: APP_FONTS.PoppinsRegular,
        color: "#17baa1"
    },
    main: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        margin: 5,
        justifyContent: 'center'
    },
    box: {
        borderWidth: 2,
        borderColor: '#17baa1',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        margin: 5,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }

})