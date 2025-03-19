import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/color";


export default StyleSheet.create({
    activityStyle: {
		padding: 30,
		borderRadius: 5,
		backgroundColor: COLORS.white,
		borderColor: COLORS.primary  // "#17baa1"

	},
	activitycontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewStyle: {
		flex: 1,
		backgroundColor: COLORS.primary 
	},
	headerTextStyle: {
		color: COLORS.white,
		fontSize: 40,
		marginRight: 150
	},
	headerStyle: {
		flex: 1,
		backgroundColor: COLORS.primary ,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footerStyle: {
		flex: 2,
		alignItems: 'center',
		// justifyContent: 'center',
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingVertical: 50,
		paddingHorizontal: 30
	},
	imageStyle: {
		height: 200,
		width: 200
	},
	textStyle: {
		color: COLORS.primary,
		fontWeight: "bold",
		fontSize: 20
	},
	textInput1: {
		margin: 10,
		width: "90%",
		height: 40,
		borderColor: COLORS.primary,
		color: "orange",
		backgroundColor: COLORS.white,
		borderWidth: 2,
		borderRadius: 5,
		padding: 10

	},
	textInput2: {
		margin: 10,
		width: "90%",
		height: 40,
		borderColor: COLORS.primary,
		color: "orange",
		backgroundColor: COLORS.white,
		borderWidth: 2,
		borderRadius: 5,
		padding: 10

	},
	buttonStyle: {
		margin: 10,
		width: "90%",
		height: 50

	}
})









