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
import React from "react";
import { Text, View } from "react-native";
export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
      setIsLoading(false);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const router = useRouter();

  return (
    <DefaultLayout imgBackground={IMG.introBg}>
      <View
        style={{
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
        }}
      >
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
            style={{
              marginTop: "auto",
            }}
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
