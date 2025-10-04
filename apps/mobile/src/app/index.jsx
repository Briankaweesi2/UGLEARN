import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isReady, auth } = useAuth();
  const { data: user, loading: userLoading } = useUser();

  if (!isReady || userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7A5FFF" />
      </View>
    );
  }

  // If not authenticated, redirect to tabs (which will show auth modal)
  if (!auth) {
    return <Redirect href="/(tabs)/home" />;
  }

  // If authenticated but no profile, redirect to onboarding
  if (auth && (!user || !user.profile)) {
    return <Redirect href="/onboarding" />;
  }

  // If authenticated with profile, redirect to main app
  return <Redirect href="/(tabs)/home" />;
}
