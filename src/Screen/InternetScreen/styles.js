import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    detail: {
        fontSize: 25,
        color: COLORS.white,
        fontFamily: APP_FONTS.PoppinsMedium,
        letterSpacing: 2
    }
})