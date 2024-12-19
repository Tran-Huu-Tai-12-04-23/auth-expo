import { IMG } from "@/assets/images";
import { ButtonOutlined, ButtonPrimary } from "@/components/@core/button";
import Row from "@/components/@core/row";
import { styleGlobal } from "@/components/@core/styles";
import { normalize } from "@/helper/helpers";
import { deviceWidth } from "@/helper/utils";
import DefaultLayout from "@/layouts/default-layout";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useClerk } from "@clerk/clerk-react";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, [signOut]);

  return (
    <DefaultLayout imgBackground={IMG.introBg}>
      <View style={styles.container}>
        <SignedIn>
          <Row full direction="column" start rowGap={10}>
            <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            <ButtonPrimary
              isLoading={isLoading}
              minWidth={deviceWidth - 30}
              title="Sign out"
              onPress={handleSignOut}
            />
          </Row>
        </SignedIn>

        <SignedOut>
          <Row
            full
            direction="column"
            center
            rowGap={10}
            style={{ marginTop: "auto" }}
          >
            <ButtonOutlined
              minWidth={deviceWidth - 30}
              height={normalize(50)}
              title="Sign up"
              onPress={() => router.navigate("/(auth)/sign-up")}
            />
            <ButtonPrimary
              minWidth={deviceWidth - 30}
              height={normalize(50)}
              title="Sign in"
              onPress={() => router.navigate("/(auth)/sign-in")}
            />
          </Row>
        </SignedOut>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    ...styleGlobal.shadow,
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(20),
    borderTopEndRadius: normalize(20),
    borderTopStartRadius: normalize(20),
    backgroundColor: "#FEFEFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: normalize(40),
  },
});
