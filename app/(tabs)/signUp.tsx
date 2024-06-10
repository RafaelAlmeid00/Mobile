import ButtonComp from "@/components/Button";
import InputComp from "@/components/Input";
import SnackBar from "@/components/SnackBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { RootStackParamList } from "@/constants/Screens";
import { IUser, UserDataIndex } from "@/interfaces/IUser";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "expo-router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, BackHandler } from "react-native";
import { ActivityIndicator, ProgressBar, TextInput } from "react-native-paper";

const stages = [
  { prefix: "seu", label: "CPF", prop: "userCPF" },
  { prefix: "seu", label: "Nome", prop: "userNome" },
  { prefix: "sua", label: "Data de Nascimento", prop: "userNascimento" },
  { prefix: "seu", label: "CEP", prop: "userEndCEP" },
  { prefix: "seu", label: "Número do Endereço", prop: "userEndnum" },
  {
    prefix: "seu",
    label: "Complemento do Endereço",
    prop: "userEndcomplemento",
  },
  { prefix: "seu", label: "Email", prop: "userEmail" },
  { prefix: "sua", label: "Senha", prop: "userSenha" },
];

export default function SignUpController() {
  const [userData, setUserData] = useState<IUser>({
    userCPF: "",
    userNome: "",
    userEmail: "",
    userSenha: "",
    userNascimento: "",
    userEndCEP: "",
    userEndUF: "",
    userEndbairro: "",
    userEndrua: "",
    userEndnum: 0,
    userEndcomplemento: undefined,
    userEndcidade: "",
    userTipo: undefined,
    listCpfListId: undefined,
    userStatus: "",
    listCpfList: undefined,
  });
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userDataWithIndex = userData as unknown as UserDataIndex;
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const switchInputValidation = (text: string | number, prop: string) => {
    let newValue = text;

    switch (prop) {
      case "userCPF":
        newValue = String(newValue).replace(/\D/g, "");
        if (String(newValue).length !== 11) {
          setDisable(true);
          newValue = String(newValue).replace(/\D/g, "");
          return newValue;
        }
        setDisable(false);
        return newValue;
      case "userEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue as string)) {
          setDisable(true);
          return newValue;
        }
        setDisable(false);
        return newValue;
      case "userEndCEP":
        newValue = String(newValue).replace(/\D/g, "");
        if (String(newValue).length !== 8) {
          setDisable(true);
          return newValue;
        }
        setDisable(false);
        return newValue;
      case "userNascimento":
        const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/;
        if (!dateRegex.test(newValue as string)) {
          setDisable(true);
          if (String(newValue).length == 8) {
            newValue =
              String(newValue).slice(0, 2) +
              "/" +
              String(newValue).slice(2, 4) +
              "/" +
              String(newValue).slice(4, 8);
            const [day, month, year] = (newValue as string).split("/");
            newValue = `${year}-${month}-${day}`;
            setDisable(false);
            return newValue;
          }
          return newValue;
        }
        break;
      default:
        if (String(newValue).length < 1) {
          setDisable(true);
          return newValue;
        }
        setDisable(false);
        return newValue;
    }
  };

  const fetchCEP = async (cep: string) => {
    try {
      setDisable(true);
      setLoading(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const createCustumerStriper = async () => {
    try {
      await axios.post(`API`);
      setLoadingScreen(false);
      navigation.navigate("login");
    } catch (error) {
      console.error("Erro ao cadastrar cliente banco Stripe:", error);
      setLoadingScreen(false);
    }
  };

  const createUser = async () => {
    try {
      setLoadingScreen(true);
      await axios.get(`API`);
    } catch (error) {
      console.error("Erro ao cadastrar o usuario:", error);
      setLoadingScreen(false);
    }
  };

  const handleChange = async (text: string | number, prop: string) => {
    text = String(switchInputValidation(text, prop));
    if (prop === "userEndCEP" && text.length > 7) {
      const response = await fetchCEP(text);
      if (response.localidade) {
        setUserData({
          ...userData,
          userEndCEP: response.cep,
          userEndcidade: response.localidade,
          userEndrua: response.logradouro,
          userEndbairro: response.bairro,
          userEndUF: response.uf,
        });
        setDisable(false);
        return;
      }
    }
    setUserData({ ...userData, [prop]: text });
  };

  const incrementProgress = () => {
    if (stage < stages.length - 1) {
      setProgress(progress + 0.1);
      setStage(stage + 1);
      setDisable(true);
    }
  };

  const decrementProgress = () => {
    if (stage > 0) {
      setProgress(progress - 0.1);
      setStage(stage - 1);
      setDisable(false);
    }
  };

  useEffect(() => {
    if (stage == 5) {
      setDisable(false);
    }
  }, [userData, stage]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("login");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <>
      {!loadingScreen ? (
        <>
          <ThemedView style={styles.container}>
            <Image
              source={require("@/assets/images/logopass.png")}
              style={styles.passLogo}
            />
            <ThemedText type="title" style={styles.textLogo}>
              EasyPass
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.main}>
            <ThemedView style={{ width: "80%", gap: 20 }}>
              <ThemedText
                style={{
                  alignSelf: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  flexWrap: "wrap",
                  width: "60%",
                  textAlign: "center",
                }}
              >
                Insira {stages[stage].prefix} {stages[stage].label}
              </ThemedText>
              <InputComp
                style={[{ width: "100%" }]}
                label={stages[stage].label}
                value={userDataWithIndex[stages[stage].prop]?.toString()}
                onChange={(text) => handleChange(text, stages[stage].prop)}
                mode={"outlined"}
                length={45}
                right={
                  stage == 7 ? (
                    <TextInput.Icon
                      icon={visible ? "eye-off" : "eye"}
                      onPress={() => setVisible((prevVisible) => !prevVisible)}
                    />
                  ) : (
                    <></>
                  )
                }
                secureText={stage == 7 ?? !visible}
              />
              {stage == 3 && userData.userEndcidade ? (
                <ThemedView>
                  <ThemedText>
                    {userData.userEndbairro}, {userData.userEndrua},{" "}
                    {userData.userEndcidade} - {userData.userEndUF}
                  </ThemedText>
                </ThemedView>
              ) : (
                (stage == 3 && loading) ?? (
                  <ActivityIndicator
                    style={{
                      alignSelf: "center",
                      width: "100%",
                      height: "auto",
                    }}
                    animating={true}
                    color={Colors.dark.icon}
                  />
                )
              )}
            </ThemedView>
            <ExpoStatusBar style="auto" />
          </ThemedView>
          <ThemedView style={styles.footer}>
            <ProgressBar progress={progress} style={styles.progress} />
            <View style={styles.shadowLine} />
            <View style={styles.progressBar}>
              {stage > 0 ? (
                <ButtonComp
                  style={[{ backgroundColor: Colors.dark.icon }]}
                  text="Voltar"
                  mode="contained"
                  disable={false}
                  loading={false}
                  click={decrementProgress}
                />
              ) : (
                <ButtonComp
                  style={[{ opacity: 0 }]}
                  text=""
                  mode="contained"
                  disable={false}
                  loading={false}
                />
              )}
              <ButtonComp
                style={[{ backgroundColor: Colors.dark.icon }]}
                text={stage === stages.length - 1 ? "Finalizar" : "Próximo"}
                mode="contained"
                disable={disable}
                click={
                  stage === stages.length - 1
                    ? () => {
                        createUser();
                        createCustumerStriper();
                      }
                    : incrementProgress
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
  main: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
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
    paddingLeft: 20,
    paddingTop: 50,
    display: "flex",
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
    alignSelf: "center",
    fontWeight: "bold",
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
