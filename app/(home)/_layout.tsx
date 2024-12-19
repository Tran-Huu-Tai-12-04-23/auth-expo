import DefaultLayout from "@/layouts/default-layout";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <DefaultLayout>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </DefaultLayout>
  );
}
