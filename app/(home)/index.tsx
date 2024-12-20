import { IconButton } from "@/components/@core/button";
import Row from "@/components/@core/row";
import Separator from "@/components/@core/separator";
import TextDefault from "@/components/@core/text-default";
import { normalize } from "@/helper/helpers";
import DefaultLayout from "@/layouts/default-layout";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Fontisto } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useCallback } from "react";
import { Image } from "react-native";

function Page() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
    }
  }, [signOut]);

  const logExternalAccounts = useCallback(() => {
    return user?.externalAccounts?.[0] as any;
  }, [user]);
  return (
    <DefaultLayout>
      <Separator height={normalize(40)} />
      <Row
        start
        full
        direction="column"
        rowGap={10}
        style={{
          paddingHorizontal: normalize(10),
        }}
      >
        <Row between full>
          <Row
            start
            colGap={10}
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: logExternalAccounts()?.imageUrl || "",
              }}
              style={{
                width: normalize(40),
                height: normalize(40),
                borderRadius: normalize(20),
              }}
            />
            <TextDefault bold>
              Hello {user?.emailAddresses[0].emailAddress}
            </TextDefault>
          </Row>

          <IconButton
            onPress={() => {}}
            icon={<Fontisto name="bell-alt" size={24} color="gray" />}
          />
        </Row>
      </Row>
    </DefaultLayout>
  );
}

export default Page;
