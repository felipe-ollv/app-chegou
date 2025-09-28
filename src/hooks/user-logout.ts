import ActionStorage from "../app/(auth)/midleware/authStorage";
import { setToken } from "../interceptor/axios-config";
import { useRouter } from "expo-router";
import { useUser } from "../context/user.context";

export function useLogout() {
  const router = useRouter();
  const { setUserData } = useUser();

  const logout = async () => {
    await ActionStorage.deleteToken();
    setToken(null);
    setUserData(null); 
    router.replace("/");
  };

  return { logout };
}
