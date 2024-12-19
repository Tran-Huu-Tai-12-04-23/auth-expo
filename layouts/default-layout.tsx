import { SafeAreaView } from "react-native-safe-area-context";

function DefaultLayout({
  isHeader = true,
  children,
}: {
  isHeader?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* Add your layout here */}
      {children}
    </SafeAreaView>
  );
}

export default DefaultLayout;
