import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightTransparent,
        position: 'absolute',
        height: HEIGHT.h100,
        width: WIDTH.w60,
        zIndex: 9,
        overflow: 'hidden',
    },
    drawerItemsContainer: {
        flex: 1,
    },
    drawerItemText: {
        color: COLORS.white,
        fontSize: FONTS.f20,
        fontFamily: APP_FONTS.PoppinsMedium,
    },
    drawerItem: {
        borderRadius: 8,
        marginVertical: 3,
        padding: 2,
        height: HEIGHT.h07
    },
    activeDrawerItem: {
        backgroundColor: COLORS.primary,
    },
    headerContainer: {
        backgroundColor: COLORS.transparent,
        height: HEIGHT.h08,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    headerIcon: {
        height: HEIGHT.h100 * 0.06,
        width: WIDTH.w100 * 0.50,
        alignSelf: 'center'
        // borderRadius: 10,
    },
    button: {
        padding: 8,
        borderRadius: 8,
    },
    listText: {
        color: COLORS.white,
        fontSize: FONTS.f20,
        fontFamily: APP_FONTS.PoppinsBold,

    },
    itemIcon: {
        height: 30,
        width: 30,
        marginHorizontal: 15
    }
});