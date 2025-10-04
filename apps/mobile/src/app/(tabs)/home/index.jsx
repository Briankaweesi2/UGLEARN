import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Search,
  Bell,
  BookOpen,
  Trophy,
  Clock,
  Star,
  ChevronRight,
  Zap,
  Target,
} from "lucide-react-native";
import { Image } from "expo-image";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { auth, signIn } = useAuth();
  const { data: user, loading: userLoading } = useUser();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Mock data for demonstration
  const todayStats = {
    studyTime: 45,
    lessonsCompleted: 3,
    points: 120,
    streak: 5,
  };

  const recentSubjects = [
    {
      id: 1,
      name: "Mathematics",
      progress: 75,
      color: "#FF6B6B",
      icon: "📊",
      nextLesson: "Algebra Basics",
    },
    {
      id: 2,
      name: "English",
      progress: 60,
      color: "#4ECDC4",
      icon: "📚",
      nextLesson: "Grammar Rules",
    },
    {
      id: 3,
      name: "Science",
      progress: 85,
      color: "#45B7D1",
      icon: "🔬",
      nextLesson: "Chemical Reactions",
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "AI Tutor",
      description: "Get instant help",
      icon: Zap,
      color: "#9B8CFF",
      action: () => router.push("/ai-tutor"),
    },
    {
      id: 2,
      title: "Practice Quiz",
      description: "Test your knowledge",
      icon: Target,
      color: "#34C759",
      action: () => router.push("/(tabs)/practice"),
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Show sign in prompt if not authenticated
  if (!auth) {
    return (
      <View
        style={{ flex: 1, backgroundColor: isDark ? "#1A1A1A" : "#D9DBE9" }}
      >
        <StatusBar style={isDark ? "light" : "dark"} />

        <View
          style={{
            flex: 1,
            backgroundColor: isDark ? "#121212" : "white",
            borderRadius: 20,
            marginTop: insets.top / 2 - 40,
            marginBottom: -20,
            paddingBottom: 20,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <BookOpen size={48} color="white" />
          </View>

          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 28,
              color: isDark ? "#FFFFFF" : "#1A1A1A",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Welcome to Uganda Learn
          </Text>

          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: isDark ? "#B0B0B0" : "#8A8A8A",
              textAlign: "center",
              marginBottom: 40,
              lineHeight: 24,
            }}
          >
            Personalized learning aligned with Uganda's National Curriculum
          </Text>

          <TouchableOpacity
            onPress={() => signIn()}
            style={{
              backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 16,
              shadowColor: isDark ? "#9B8CFF" : "#7A5FFF",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: "white",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#1A1A1A" : "#D9DBE9" }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#121212" : "white",
          borderRadius: 20,
          marginTop: insets.top / 2 - 40,
          marginBottom: -20,
          paddingBottom: 20,
        }}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: insets.top + 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: isDark ? "#B0B0B0" : "#8A8A8A",
                }}
              >
                Good morning
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 24,
                  color: isDark ? "#FFFFFF" : "#1A1A1A",
                  marginTop: 2,
                }}
              >
                {user?.profile?.full_name || user?.name || "Student"}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
                justifyContent: "center",
                alignItems: "center",
              }}
              activeOpacity={0.7}
            >
              <Bell size={20} color={isDark ? "#FFFFFF" : "#54545C"} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? "#9B8CFF" : "#7A5FFF"}
            />
          }
        >
          {/* Today's Stats */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#1A1A1A",
                marginBottom: 16,
              }}
            >
              Today's Progress
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
                  borderRadius: 12,
                  padding: 16,
                  marginRight: 8,
                  alignItems: "center",
                }}
              >
                <Clock size={24} color="#34C759" />
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#1A1A1A",
                    marginTop: 8,
                  }}
                >
                  {todayStats.studyTime}m
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                    color: isDark ? "#B0B0B0" : "#8A8A8A",
                  }}
                >
                  Study Time
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
                  borderRadius: 12,
                  padding: 16,
                  marginHorizontal: 4,
                  alignItems: "center",
                }}
              >
                <Trophy size={24} color="#FF9500" />
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#1A1A1A",
                    marginTop: 8,
                  }}
                >
                  {todayStats.points}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                    color: isDark ? "#B0B0B0" : "#8A8A8A",
                  }}
                >
                  Points
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
                  borderRadius: 12,
                  padding: 16,
                  marginLeft: 8,
                  alignItems: "center",
                }}
              >
                <Star size={24} color="#FF6B6B" />
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    fontSize: 20,
                    color: isDark ? "#FFFFFF" : "#1A1A1A",
                    marginTop: 8,
                  }}
                >
                  {todayStats.streak}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                    color: isDark ? "#B0B0B0" : "#8A8A8A",
                  }}
                >
                  Day Streak
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#1A1A1A",
                marginBottom: 16,
              }}
            >
              Quick Actions
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  onPress={action.action}
                  style={{
                    flex: 1,
                    backgroundColor: action.color,
                    borderRadius: 16,
                    padding: 20,
                    marginHorizontal: action.id === 1 ? 0 : 8,
                    marginLeft: action.id === 1 ? 0 : 8,
                    marginRight: action.id === quickActions.length ? 0 : 8,
                  }}
                  activeOpacity={0.8}
                >
                  <action.icon size={28} color="white" />
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 16,
                      color: "white",
                      marginTop: 12,
                      marginBottom: 4,
                    }}
                  >
                    {action.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continue Learning */}
          <View style={{ paddingHorizontal: 24 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                  color: isDark ? "#FFFFFF" : "#1A1A1A",
                }}
              >
                Continue Learning
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/(tabs)/learn")}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    color: isDark ? "#9B8CFF" : "#7A5FFF",
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {recentSubjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                onPress={() => router.push(`/subjects/${subject.id}`)}
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "white",
                  borderWidth: 1,
                  borderColor: isDark ? "#333333" : "#E6E6E6",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: subject.color,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{subject.icon}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 16,
                      color: isDark ? "#FFFFFF" : "#1A1A1A",
                      marginBottom: 4,
                    }}
                  >
                    {subject.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: isDark ? "#B0B0B0" : "#8A8A8A",
                      marginBottom: 8,
                    }}
                  >
                    Next: {subject.nextLesson}
                  </Text>

                  {/* Progress Bar */}
                  <View
                    style={{
                      height: 4,
                      backgroundColor: isDark ? "#333333" : "#E6E6E6",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        height: "100%",
                        width: `${subject.progress}%`,
                        backgroundColor: subject.color,
                      }}
                    />
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 14,
                      color: subject.color,
                      marginBottom: 4,
                    }}
                  >
                    {subject.progress}%
                  </Text>
                  <ChevronRight
                    size={16}
                    color={isDark ? "#B0B0B0" : "#8A8A8A"}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
