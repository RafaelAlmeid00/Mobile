// screens.ts
import { FontAwesome } from '@expo/vector-icons';
export const screens = {
  index: {
    title: "Index",
  },
  login: {
    title: "Login",
  },
  signUp: {
    title: "SignUp",
  },
  forgetPassword: {
    title: "ForgetPassword",
  },
};

export const screensSystem = {
  "system/home": {
    title: "Início",
    icon: "home",
  },
  "system/bus": {
    title: "Ônibus",
    icon: "bus",
  },
  "system/recharge": {
    title: "Recarga",
    icon: "plus",
  },
  "system/extrato": {
    title: "Extrato",
    icon: "file",
  },
  "system/card": {
    title: "Cartões",
    icon: "credit-card-alt",
  },
};

export type ScreenNames = keyof typeof screens;
export type ScreenNamesSystem = keyof typeof screensSystem;

export type RootStackParamList = {
  [K in ScreenNames]: undefined;
};

export type RootStackParamListSystem = {
  [K in ScreenNamesSystem]: undefined;
};
