import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { User, GraduationCap, Users, ChevronRight } from "lucide-react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useAuth } from "@/utils/auth/useAuth";
import useUser from "@/utils/auth/useUser";

const ROLES = [
  {
    id: 'student',
    title: 'Student',
    description: 'I want to learn and improve my grades',
    icon: GraduationCap,
    color: '#34C759',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'I want to track my students\' progress',
    icon: User,
    color: '#007AFF',
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'I want to monitor my child\'s learning',
    icon: Users,
    color: '#FF9500',
  },
];

const GRADE_LEVELS = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7',
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6',
  'University'
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'lg', name: 'Luganda' },
  { code: 'rn', name: 'Runyankole' },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { auth } = useAuth();
  const { refetch } = useUser();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    full_name: '',
    grade_level: '',
    school_name: '',
    language_preference: 'en',
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleRoleSelect = (roleId) => {
    setFormData({ ...formData, role: roleId });
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2 && !formData.full_name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (step === 3 && formData.role === 'student' && !formData.grade_level) {
      Alert.alert('Error', 'Please select your grade level');
      return;
    }
    setStep(step + 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create profile');
      }

      // Refresh user data
      await refetch();
      
      // Navigate to main app
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert('Error', error.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 24,
          color: isDark ? "#FFFFFF" : "#1A1A1A",
          textAlign: "center",
          marginBottom: 8,
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
        }}
      >
        Choose your role to get started
      </Text>

      {ROLES.map((role) => (
        <TouchableOpacity
          key={role.id}
          onPress={() => handleRoleSelect(role.id)}
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "white",
            borderWidth: 1,
            borderColor: isDark ? "#333333" : "#E6E6E6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
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
              backgroundColor: role.color,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <role.icon size={24} color="white" />
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
              {role.title}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 14,
                color: isDark ? "#B0B0B0" : "#8A8A8A",
              }}
            >
              {role.description}
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? "#B0B0B0" : "#8A8A8A"} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep2 = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 24,
          color: isDark ? "#FFFFFF" : "#1A1A1A",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Tell us about yourself
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
          color: isDark ? "#B0B0B0" : "#8A8A8A",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        We'll personalize your experience
      </Text>

      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#1A1A1A",
            marginBottom: 12,
          }}
        >
          Full Name
        </Text>
        <View
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#1A1A1A",
            }}
            onPress={() => {
              // In a real app, you'd use TextInput here
              Alert.prompt(
                'Full Name',
                'Enter your full name',
                (text) => setFormData({ ...formData, full_name: text }),
                'plain-text',
                formData.full_name
              );
            }}
          >
            {formData.full_name || 'Tap to enter your name'}
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: isDark ? "#FFFFFF" : "#1A1A1A",
            marginBottom: 12,
          }}
        >
          School Name (Optional)
        </Text>
        <View
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "#F6F7F9",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              color: isDark ? "#FFFFFF" : "#1A1A1A",
            }}
            onPress={() => {
              Alert.prompt(
                'School Name',
                'Enter your school name (optional)',
                (text) => setFormData({ ...formData, school_name: text }),
                'plain-text',
                formData.school_name
              );
            }}
          >
            {formData.school_name || 'Tap to enter school name'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: "center",
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
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ flex: 1, paddingHorizontal: 24 }}>
      <Text
        style={{
          fontFamily: "Poppins_700Bold",
          fontSize: 24,
          color: isDark ? "#FFFFFF" : "#1A1A1A",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {formData.role === 'student' ? 'Select Your Grade' : 'Choose Language'}
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
          color: isDark ? "#B0B0B0" : "#8A8A8A",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        {formData.role === 'student' 
          ? 'This helps us show relevant content'
          : 'Select your preferred language'
        }
      </Text>

      {formData.role === 'student' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {GRADE_LEVELS.map((grade) => (
              <TouchableOpacity
                key={grade}
                onPress={() => setFormData({ ...formData, grade_level: grade })}
                style={{
                  width: '30%',
                  backgroundColor: formData.grade_level === grade 
                    ? (isDark ? "#9B8CFF" : "#7A5FFF")
                    : (isDark ? "#1E1E1E" : "#F6F7F9"),
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 12,
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: formData.grade_level === grade 
                      ? "white"
                      : (isDark ? "#FFFFFF" : "#1A1A1A"),
                  }}
                >
                  {grade}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => setFormData({ ...formData, language_preference: lang.code })}
              style={{
                backgroundColor: formData.language_preference === lang.code
                  ? (isDark ? "#9B8CFF" : "#7A5FFF")
                  : (isDark ? "#1E1E1E" : "white"),
                borderWidth: 1,
                borderColor: formData.language_preference === lang.code
                  ? "transparent"
                  : (isDark ? "#333333" : "#E6E6E6"),
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  color: formData.language_preference === lang.code
                    ? "white"
                    : (isDark ? "#FFFFFF" : "#1A1A1A"),
                  textAlign: "center",
                }}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={handleComplete}
        disabled={loading}
        style={{
          backgroundColor: isDark ? "#9B8CFF" : "#7A5FFF",
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: "center",
          marginTop: 20,
          opacity: loading ? 0.7 : 1,
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
          {loading ? 'Setting up...' : 'Complete Setup'}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
          paddingTop: insets.top + 40,
        }}
      >
        {/* Progress Indicator */}
        <View style={{ paddingHorizontal: 24, marginBottom: 40 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {[1, 2, 3].map((stepNum) => (
              <View
                key={stepNum}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: step >= stepNum 
                    ? (isDark ? "#9B8CFF" : "#7A5FFF")
                    : (isDark ? "#333333" : "#E6E6E6"),
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </View>
    </View>
  );
}