import { StyleSheet } from "react-native";
import { FONTS, HEIGHT, SPACING, WIDTH } from "../../utils/dimension";
import { COLORS } from "../../utils/color";
import { APP_FONTS } from "../../utils/fontFamily";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  heading: {
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: APP_FONTS.PoppinsBold,
    marginLeft: 10
  },


});
