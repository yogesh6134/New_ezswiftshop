import { StyleSheet } from "react-native";
import { APP_FONTS } from "../../utils/fontFamily";
import { COLORS } from "../../utils/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      main: {
        padding: 20
      },
      header: {
        fontSize: 24,
        fontFamily: APP_FONTS.PoppinsBold,
        marginBottom: 10,
      },
      progressBar: {
        height: 10,
        borderRadius: 5,
        marginBottom: 20,
      },
      statusItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
      },
      statusText: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: APP_FONTS.PoppinsBold,
      },
      timeText: {
        fontSize: 14,
        fontFamily: APP_FONTS.PoppinsRegular,
        color: COLORS.black,
      },
})