import { IMG } from "@/assets/images";
import { IconButton } from "@/components/@core/button";
import Loading from "@/components/@core/loading";
import { normalize } from "@/helper/helpers";
import { deviceWidth } from "@/helper/utils";
import DefaultLayout from "@/layouts/default-layout";
import { useUser } from "@clerk/clerk-react";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#F2F2F2",
        height: normalize(60),
      }}
    >
      <Image
        source={IMG.bottomBar}
        style={{
          width: deviceWidth,
          position: "absolute",
          height: normalize(60),
        }}
      />

      <View
        style={{
          position: "absolute",
          left: deviceWidth / 2.3,
          top: -normalize(30),
        }}
      >
        <IconButton
          onPress={() => {}}
          icon={<FontAwesome6 name="add" size={24} color="black" />}
        />
      </View>

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        let iconName;
        if (route.name === "index") {
          iconName = "home";
        } else if (route.name === "profile") {
          iconName = "person";
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={isFocused ? "rgba(116, 90, 255, 1)" : "gray"}
            />
            <Text
              style={{
                color: isFocused ? "rgba(116, 90, 255, 1)" : "gray",
                fontSize: 12,
              }}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/intro" />;
  }

  return (
    <DefaultLayout>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "index") {
              iconName = "home";
            } else if (route.name === "profile") {
              iconName = "person";
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "rgba(116, 90, 255, 1)",
          tabBarInactiveTintColor: "gray",
        })}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </DefaultLayout>
  );
}
