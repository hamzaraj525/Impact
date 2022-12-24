import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  btnsContainer: {
    width: width,
    height: 56,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  bottomBtn1: {
    width: "30%",
    height: 56,
    backgroundColor: "#19363C",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomBtn2: {
    width: "70%",
    height: 56,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
