import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";

export default StyleSheet.create({
  
      mainContainer: {
        flex: 1,
        padding: 8,
        paddingTop: 20,
        backgroundColor: COLORS.white,
      },
      container: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 3,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.gray,
        padding: 15,
        elevation: 3
    
      },
      tetxStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.black,
        margin: 5
      },
      inputStyle: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: COLORS.secondary,
        backgroundColor: COLORS.white,
        padding: 5
      }
    
})