import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS, HEIGHT, SPACING, WIDTH } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        backgroundColor: 'black',
        justifyContent: 'space-around',
        width: WIDTH.w100
    },
    menuIcon: {
        color: COLORS.white,
        padding: 10
    },
    logo: {
        width: 200,
        height: 50
    },
    rightSide: {
        flexDirection: "row",
        marginRight: 10,
    },
    iconStyle: { 
        color: COLORS.white, 
        paddingVertical: 12, 
        paddingHorizontal: 7 
    }
})