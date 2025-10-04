import { Tabs } from "expo-router";
import { Home, BookOpen, Trophy, BarChart3, User } from "lucide-react-native";
import { View, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1E1E1E" : "#fff",
          borderTopWidth: 1,
          borderColor: isDark ? "#333333" : "#E5E7EB",
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarActiveTintColor: isDark ? "#9B8CFF" : "#7A5FFF",
        tabBarInactiveTintColor: isDark ? "#9E9E9E" : "#8A8A8A",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Home color={color} size={24} strokeWidth={2} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <BookOpen color={color} size={24} strokeWidth={2} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Trophy color={color} size={24} strokeWidth={2} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <BarChart3 color={color} size={24} strokeWidth={2} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <User color={color} size={24} strokeWidth={2} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
