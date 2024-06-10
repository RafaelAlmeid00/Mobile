import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedScroll } from "@/components/ThemedScroll";
import { ThemedText } from "@/components/ThemedText";
import { View, Image, StyleSheet } from "react-native";

export default function BusSystemScreen() {
  return (
    <>
      <ThemedScroll>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <View style={styles.container}>
              <Image
                source={require("@/assets/images/logopass.png")}
                style={styles.passLogo}
              />
              <ThemedText type="title" style={styles.textLogo}>
                EasyPass
              </ThemedText>
            </View>
          }
        ></ParallaxScrollView>
      </ThemedScroll>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 60,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logoContainer: {
    display: "flex",
    alignSelf: "flex-start",
  },
  container: {
    marginLeft: 20,
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    opacity: 0.4,
  },
  passLogo: {
    height: 40,
    width: 40,
  },
  textLogo: {
    marginLeft: 10,
    fontSize: 25,
    color: "white",
  },
  footer: {
    height: 70,
    width: "100%",
  },
  shadowLine: {
    height: 2,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    opacity: 0.15,
  },
  progressBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "90%",
    height: "100%",
  },
  progress: {
    marginTop: -20,
    width: "70%",
    alignSelf: "center",
    height: 5,
    borderRadius: 20,
  },
});
