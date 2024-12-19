import { ButtonPrimary } from "@/components/@core/button";
import TextDefault from "@/components/@core/text-default";
import DefaultLayout from "@/layouts/default-layout";
import { useClerk } from "@clerk/clerk-expo";
import Header from "../header";

function Page() {
  const { signOut } = useClerk();

  return (
    <DefaultLayout>
      <Header title="Home" />
      <TextDefault>Home</TextDefault>
      <ButtonPrimary title="Go to not found" onPress={signOut} />
    </DefaultLayout>
  );
}

export default Page;
