import { deviceHeight, deviceWidth } from "@/helper/utils";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DefaultLayout({
  isHeader = true,
  children,
  imgBackground,
}: {
  isHeader?: boolean;
  children: React.ReactNode;
  imgBackground?: any;
}) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      {/* Add your layout here */}
      {imgBackground && (
        <Image
          source={imgBackground}
          style={{
            position: "absolute",
            width: deviceWidth,
            height: deviceHeight,
          }}
        />
      )}
      {children}
    </SafeAreaView>
  );
}

export default DefaultLayout;
