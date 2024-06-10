import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, Button, ProgressBar } from "react-native-paper";
import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";
import ButtonComp from "@/components/Button";
import { useNavigation } from "expo-router";
import { RootStackParamList } from "@/constants/Screens";
import { NavigationProp } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [entryState, setEntryState] = useState<string | null>();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [props, setProps] = useState({
    image: (
      <Image
        source={require("@/assets/images/onibus.jpg")}
        style={styles.reactLogo}
      />
    ),
    title: "Bem-Vindo!",
    subtitle: "Conheça a EasyPass",
    text: "Uma Carteira Digital para o seu Cartão de Passagem, onde poderá fazer recargas e acompanhar seus saldos.",
  });

  const incrementProgress = () => {
    setProgress(progress + 0.3);
    setStage(stage + 1);
  };
  const decrementProgress = () => {
    setProgress(progress - 0.3);
    setStage(stage - 1);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("entryState", "true");
      navigation.navigate("login");
    } catch (e) {
      console.log("aaaaa");
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("entryState");
      setEntryState(value == "true" ? value : "false");
      if (value !== null && value == "true") {
        navigation.navigate("login");
      }
    } catch (e) {
      console.log("aaaaaaaa");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (stage == 0) {
      setProps({
        image: (
          <Image
            source={require("@/assets/images/onibus.jpg")}
            style={styles.reactLogo}
          />
        ),
        title: "Bem-Vindo!",
        subtitle: "Conheça a EasyPass",
        text: "Uma Carteira Digital para o seu Cartão de Passagem, onde poderá fazer recargas e acompanhar seus saldos.",
      });
    }

    if (stage == 1) {
      setProps({
        image: (
          <Image
            source={require("@/assets/images/Viaje__-_VR_Card.jpeg")}
            style={styles.reactLogo}
          />
        ),
        title: "Faça Recargas!",
        subtitle: "Em qualquer cartão",
        text: "Será possivel realizar recargas ao cadastrar seu cartão de passagem parceiro e automaticamente irá debitar em sua carteira digital.",
      });
    }

    if (stage == 2) {
      setProps({
        image: (
          <Image
            source={require("@/assets/images/meu-onibus-noticia.jpg")}
            style={styles.reactLogo}
          />
        ),
        title: "Gerencie seu Cartão!",
        subtitle: "Veja tudo que acontece",
        text: "No aplicativo você terá uma visão ampla e geral das movimentações no seu cartão em tempo real com total transparência e praticidade.",
      });
    }

    if (stage == 3) {
      setProps({
        image: (
          <Image
            source={require("@/assets/images/onibus.jpg")}
            style={styles.reactLogo}
          />
        ),
        title: "Bem-Vindo!",
        subtitle: "Conheça a EasyPass",
        text: "Uma Carteira Digital para o seu Cartão de Passagem, onde poderá fazer recargas e acompanhar seus saldos.",
      });
    }
  }, [stage]);

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.x;
    if (currentScrollPosition > lastScrollPosition) {
      if (stage < 2) {
        incrementProgress();
      }
    } else if (currentScrollPosition < lastScrollPosition) {
      if (stage > 0) {
        decrementProgress();
      }
    }
    setLastScrollPosition(currentScrollPosition);
  };

  return (
    <>
      {entryState ? (
        <>
          <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
              <>
                {props.image}
                <View style={styles.container}>
                  <Image
                    source={require("@/assets/images/logopass.png")}
                    style={styles.passLogo}
                  />
                  <ThemedText type="title" style={styles.textLogo}>
                    EasyPass
                  </ThemedText>
                </View>
              </>
            }
          >
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">{props.title}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">{props.subtitle}</ThemedText>
              <ThemedText>
                {props.text}
              </ThemedText>
            </ThemedView>
          </ParallaxScrollView>
          
            <ThemedView style={styles.footer}>
              <ProgressBar progress={progress} style={styles.progress} />

              <View style={styles.shadowLine} />
              <View style={styles.progressBar}>
                {stage > 0 ? (
                  <ButtonComp
                    style={[{ backgroundColor: Colors.dark.icon }]}
                    text={"Voltar"}
                    mode={"contained"}
                    disable={false}
                    loading={false}
                    click={decrementProgress}
                  />
                ) : (
                  <ButtonComp
                    style={[{ opacity: 0 }]}
                    text={""}
                    mode={"contained"}
                    disable={false}
                    loading={false}
                  />
                )}
                <ButtonComp
                  style={[{ backgroundColor: Colors.dark.icon }]}
                  text={stage == 2 ? "Finalizar" : "Próximo"}
                  mode={"contained"}
                  disable={false}
                  loading={false}
                  click={
                    stage < 2
                      ? incrementProgress
                      : () => {
                          storeData();
                        }
                  }
                />
              </View>
            </ThemedView>
        </>
      ) : (
        <ThemedView
          style={{ alignSelf: "center", width: "100%", height: "100%" }}
        >
          <ActivityIndicator
            style={{ alignSelf: "center", width: "100%", height: "100%" }}
            animating={true}
            color={Colors.dark.icon}
          />
        </ThemedView>
      )}
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
