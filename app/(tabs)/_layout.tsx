import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  RootStackParamList,
  ScreenNames,
  ScreenNamesSystem,
  screens,
  screensSystem,
} from "@/constants/Screens";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          display: route.name.startsWith("system/") ? "flex" : "none",
          height: '7%',
          paddingBottom: 5
        },
        tabBarLabelStyle: {
          fontSize: 12, 
        },
      })}
    >
      {Object.keys(screensSystem).map((screenName) => {
        const typedScreenName = screenName as ScreenNamesSystem;
        const screen = screensSystem[typedScreenName];
        return (
          <Tabs.Screen
            key={typedScreenName}
            name={typedScreenName}
            options={{
              title: screen.title,
              tabBarAllowFontScaling: true,
              tabBarIcon: ({ color }) => (
                <FontAwesome size={18} name={screen.icon} color={color} />
              ),
            }}
          />
        );
      })}

      {Object.keys(screens).map((screenName) => {
        const typedScreenName = screenName as ScreenNames;
        return (
          <Tabs.Screen
            key={typedScreenName}
            name={typedScreenName}
            options={{ href: null }}
          />
        );
      })}
    </Tabs>
  );
}
