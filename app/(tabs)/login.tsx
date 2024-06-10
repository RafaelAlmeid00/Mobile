import { BackHandler, Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";
import ButtonComp from "@/components/Button";
import { IconButton, TextInput } from "react-native-paper";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import InputComp from "@/components/Input";
import Animated from "@/components/AnimatedView";
import SnackBar from "@/components/SnackBar";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { RootStackParamList, RootStackParamListSystem } from "@/constants/Screens";

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigationSystem = useNavigation<NavigationProp<RootStackParamListSystem>>();
  const [cpf, setCPF] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const buttonDisabled = {
    backgroundColor: disable ? "gray" : Colors.dark.icon,
  };
  const [authError, setAuthError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setDisable(true);
    try {
      const res = await axios.post(`http://localhost:5227/api/User/Login`, {
        userCpf: cpf,
        userSenha: password,
      });

      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setLoading(false);
        navigationSystem.navigate("system/home", res.data.token);
      } 
      setLoading(false);
      setDisable(false);
      setError(true);
    } catch (error) {
      setLoading(false);
      setDisable(false);
      setError(true);
    }
  };

  const authenticateWithBiometry = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Entre com sua Biometria ou Facial",
        cancelLabel: "Entrar com senha",
        disableDeviceFallback: true,
      });

      console.debug(result.success);
      if (result.success) {
        navigationSystem.navigate("system/home");
      } else {
        console.debug("Não validado");
        setAuthError(true);
        setError(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const checkBiometryAvailability = async () => {
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      ) ||
      supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      if (token) {
        setAuth(true);
        authenticateWithBiometry();
      } else {
        setAuth(false);
        console.log("sem token");
      }
    } else {
      setAuth(false);
      console.log("Sem biometria");
    }
  };

  useEffect(() => {
    checkBiometryAvailability();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("login");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <>
      <ThemedView style={styles.container}>
        <Image
          source={require("@/assets/images/logopass.png")}
          style={styles.passLogo}
        />
        <ThemedText
          type="title"
          style={(styles.textLogo)}
        >
          EasyPass
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.main}>
        <ThemedView style={{ marginTop: -100, width: "80%", gap: 20 }}>
          <ThemedText style={{ textAlign: "center" }}>
            Não possui uma conta?{" "}
          </ThemedText>
          <ButtonComp
            color={Colors.dark.icon}
            text={"Clique Aqui"}
            mode={"text"}
            click={() => navigation.navigate("signUp")}
          />
          <InputComp
            style={[{ width: "100%" }]}
            mode={"flat"}
            left={<TextInput.Icon icon="account" />}
            value={cpf}
            onChange={(text) => setCPF(text.replace(/\D/g, ""))}
            length={11}
            label={"Digite seu CPF"}
          />
          <InputComp
            style={[{ width: "100%" }]}
            mode={"flat"}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={visible ? "eye-off" : "eye"}
                onPress={() => setVisible((prevVisible) => !prevVisible)}
              />
            }
            value={password}
            onChange={(text) => setPassword(text)}
            length={11}
            label={"Digite sua senha"}
            secureText={!visible}
          />
          <Animated
            mode={"fadeIn"}
            time={1000}
            styles={[{ opacity: disable ? 0.6 : 1 }]}
          >
            <ButtonComp
              style={[buttonDisabled]}
              text={"Entrar"}
              mode={"contained"}
              disable={disable}
              loading={loading}
              click={() => { navigationSystem.navigate('system/home')}}
            />
          </Animated>
          <ButtonComp
            style={[{ marginTop: 30 }]}
            color={Colors.dark.icon}
            text={"Esqueci a senha"}
            mode={"text"}
            click={() => navigation.navigate("forgetPassword")}
          />

          {auth && (
            <>
              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <IconButton
                  style={{ alignSelf: "center" }}
                  iconColor={Colors.dark.icon}
                  icon={"fingerprint"}
                  size={35}
                  onPress={authenticateWithBiometry}
                />
                <ThemedText
                  style={{
                    fontSize: 11,
                    marginTop: 5,
                    color: Colors.dark.icon,
                  }}
                >
                  Entre com a Biometria
                </ThemedText>
              </View>
            </>
          )}
        </ThemedView>

        {error &&
          (authError ? (
            <SnackBar
              color={"red"}
              text={"Biometria não autenticada!"}
              visible={error}
              setVisibleSnack={setError}
            />
          ) : (
            <SnackBar
              color={"red"}
              text={"CPF ou Senha inválidos"}
              label={"Cadastre-se!"}
              visible={error}
              action={() => navigation.navigate("signUp")}
              setVisibleSnack={setError}
            />
          ))}
        <ExpoStatusBar style="auto" />
      </ThemedView>
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
    height: "100%",
  },
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
