import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { FONTS } from "../../utils/dimension";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 5
    },
    leftSide: {
        width: '40%',
    },
    rightSide: {
        width: '60%',
    },
    Heading: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white
    },
    Detail: {
        fontSize: FONTS.f18,
        fontFamily: APP_FONTS.PoppinsMedium,
        color: COLORS.white
    }
})