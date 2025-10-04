import React, { useState, useCallback } from "react";
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
  Filter,
  BookOpen, 
  Play,
  Clock,
  Star,
  ChevronRight,
  Zap
} from "lucide-react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

const GRADE_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];

export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('P4');
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { auth, signIn } = useAuth();
  const { data: user } = useUser();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Mock subjects data
  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      description: "Numbers, algebra, geometry, and problem solving",
      icon: "📊",
      color: "#FF6B6B",
      lessons: 24,
      duration: "3h 45m",
      difficulty: "Medium",
      progress: 65,
      isNew: false,
    },
    {
      id: 2,
      name: "English Language",
      description: "Reading, writing, grammar, and literature",
      icon: "📚",
      color: "#4ECDC4",
      lessons: 18,
      duration: "2h 30m",
      difficulty: "Easy",
      progress: 40,
      isNew: false,
    },
    {
      id: 3,
      name: "Science",
      description: "Biology, chemistry, physics, and experiments",
      icon: "🔬",
      color: "#45B7D1",
      lessons: 20,
      duration: "4h 15m",
      difficulty: "Hard",
      progress: 80,
      isNew: false,
    },
    {
      id: 4,
      name: "Social Studies",
      description: "History, geography, and civic education",
      icon: "🌍",
      color: "#96CEB4",
      lessons: 16,
      duration: "2h 45m",
      difficulty: "Medium",
      progress: 25,
      isNew: true,
    },
    {
      id: 5,
      name: "Luganda",
      description: "Local language skills and cultural studies",
      icon: "🗣️",
      color: "#FECA57",
      lessons: 12,
      duration: "1h 50m",
      difficulty: "Easy",
      progress: 0,
      isNew: true,
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleAITutor = () => {
    Alert.alert(
      "AI Tutor",
      "Get personalized help with any topic. What would you like to learn about?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start Chat", onPress: () => router.push("/ai-tutor") }
      ]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  // Show sign in prompt if not authenticated
  if (!auth) {
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
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <BookOpen size={64} color={isDark ? "#9B8CFF" : "#7A5FFF"} />
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 24,
              color: isDark ? "#FFFFFF" : "#1A1A1A",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 12,
            }}
          >
            Start Learning Today
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: isDark ? "#B0B0B0" : "#8A8A8A",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Sign in to access personalized lessons and track your progress
          </Text>
          <TouchableOpacity
            onPress={() => signIn()}
            style={{
              backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 16,
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
              Sign In to Learn
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
                  fontFamily: "Poppins_700Bold",
                  fontSize: 28,
                  color: isDark ? "#FFFFFF" : "#1A1A1A",
                }}
              >
                Learn
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: isDark ? "#B0B0B0" : "#8A8A8A",
                  marginTop: 4,
                }}
              >
                Choose a subject to continue learning
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleAITutor}
              style={{
                backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
              activeOpacity={0.8}
            >
              <Zap size={16} color="white" />
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 12,
                  color: "white",
                  marginLeft: 4,
                }}
              >
                AI Tutor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
              borderRadius: 16,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginBottom: 20,
            }}
          >
            <Search size={20} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
            <Text
              style={{
                flex: 1,
                marginLeft: 12,
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                color: isDark ? "#B0B0B0" : "#8A8A8A",
              }}
            >
              Search subjects or topics...
            </Text>
            <TouchableOpacity>
              <Filter size={20} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
            </TouchableOpacity>
          </View>

          {/* Grade Level Selector */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 16,
                color: isDark ? "#FFFFFF" : "#1A1A1A",
                marginBottom: 12,
              }}
            >
              Grade Level
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            >
              {GRADE_LEVELS.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  onPress={() => setSelectedGrade(grade)}
                  style={{
                    backgroundColor: selectedGrade === grade
                      ? (isDark ? "#9B8CFF" : "#7A5FFF")
                      : (isDark ? "#1E1E1E" : "#F6F7F9"),
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      color: selectedGrade === grade
                        ? "white"
                        : (isDark ? "#B0B0B0" : "#8A8A8A"),
                    }}
                  >
                    {grade}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
          {/* Subjects List */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 18,
                color: isDark ? "#FFFFFF" : "#1A1A1A",
                marginBottom: 16,
              }}
            >
              Available Subjects
            </Text>

            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                onPress={() => router.push(`/subjects/${subject.id}`)}
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "white",
                  borderWidth: 1,
                  borderColor: isDark ? "#333333" : "#E6E6E6",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 16,
                }}
                activeOpacity={0.7}
              >
                {/* Header */}
                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 12 }}>
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
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                      <Text
                        style={{
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: 18,
                          color: isDark ? "#FFFFFF" : "#1A1A1A",
                          flex: 1,
                        }}
                      >
                        {subject.name}
                      </Text>
                      {subject.isNew && (
                        <View
                          style={{
                            backgroundColor: "#34C759",
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins_500Medium",
                              fontSize: 10,
                              color: "white",
                            }}
                          >
                            NEW
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 14,
                        color: isDark ? "#B0B0B0" : "#8A8A8A",
                        lineHeight: 20,
                      }}
                    >
                      {subject.description}
                    </Text>
                  </View>
                </View>

                {/* Stats */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
                    <BookOpen size={14} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: isDark ? "#B0B0B0" : "#8A8A8A",
                        marginLeft: 4,
                      }}
                    >
                      {subject.lessons} lessons
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
                    <Clock size={14} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
                    <Text
                      style={{
                        fontFamily: "Poppins_400Regular",
                        fontSize: 12,
                        color: isDark ? "#B0B0B0" : "#8A8A8A",
                        marginLeft: 4,
                      }}
                    >
                      {subject.duration}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      backgroundColor: subject.difficulty === 'Easy' ? '#34C759' :
                                     subject.difficulty === 'Medium' ? '#FF9500' : '#FF3B30',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 10,
                        color: "white",
                      }}
                    >
                      {subject.difficulty}
                    </Text>
                  </View>
                </View>

                {/* Progress */}
                {subject.progress > 0 && (
                  <View style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 12,
                          color: isDark ? "#B0B0B0" : "#8A8A8A",
                        }}
                      >
                        Progress
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: 12,
                          color: subject.color,
                        }}
                      >
                        {subject.progress}%
                      </Text>
                    </View>
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
                )}

                {/* Action Button */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: subject.color,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    activeOpacity={0.8}
                  >
                    <Play size={14} color="white" fill="white" />
                    <Text
                      style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 12,
                        color: "white",
                        marginLeft: 4,
                      }}
                    >
                      {subject.progress > 0 ? 'Continue' : 'Start Learning'}
                    </Text>
                  </TouchableOpacity>
                  
                  <ChevronRight size={20} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}