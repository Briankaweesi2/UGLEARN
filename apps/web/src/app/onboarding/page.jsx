"use client";

import { useState } from "react";
import useUser from "@/utils/useUser";
import {
  User,
  GraduationCap,
  Users,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

const ROLES = [
  {
    id: "student",
    title: "Student",
    description: "I want to learn and improve my grades",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "I want to track my students' progress",
    icon: User,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "parent",
    title: "Parent",
    description: "I want to monitor my child's learning",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
];

const GRADE_LEVELS = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "University",
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "lg", name: "Luganda" },
  { code: "rn", name: "Runyankole" },
];

export default function OnboardingPage() {
  const { refetch } = useUser();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    full_name: "",
    grade_level: "",
    school_name: "",
    language_preference: "en",
  });

  const handleRoleSelect = (roleId) => {
    setFormData({ ...formData, role: roleId });
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2 && !formData.full_name.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (step === 3 && formData.role === "student" && !formData.grade_level) {
      alert("Please select your grade level");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create profile");
      }

      // Refresh user data
      await refetch();

      // Navigate to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error creating profile:", error);
      alert(error.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Uganda Learn
        </h1>
        <p className="text-xl text-gray-600">
          Choose your role to get started with personalized learning
        </p>
      </div>

      <div className="space-y-4">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className="w-full bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center font-medium group-hover:shadow-lg transition-all group`}
              >
                <role.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600">{role.description}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tell us about yourself
        </h1>
        <p className="text-xl text-gray-600">
          We'll personalize your learning experience
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name (Optional)
          </label>
          <input
            type="text"
            value={formData.school_name}
            onChange={(e) =>
              setFormData({ ...formData, school_name: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Enter your school name"
          />
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            onClick={handleBack}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {formData.role === "student"
            ? "Select Your Grade Level"
            : "Choose Your Language"}
        </h1>
        <p className="text-xl text-gray-600">
          {formData.role === "student"
            ? "This helps us show you relevant content"
            : "Select your preferred language for the interface"}
        </p>
      </div>

      {formData.role === "student" ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {GRADE_LEVELS.map((grade) => (
            <button
              key={grade}
              onClick={() => setFormData({ ...formData, grade_level: grade })}
              className={`py-4 px-2 rounded-lg font-medium transition-all ${
                formData.grade_level === grade
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-12">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() =>
                setFormData({ ...formData, language_preference: lang.code })
              }
              className={`w-full p-4 rounded-lg font-medium transition-all ${
                formData.language_preference === lang.code
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-gray-400 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={
            loading || (formData.role === "student" && !formData.grade_level)
          }
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Setting up...
            </>
          ) : (
            <>
              <Check className="w-5 h-5 mr-2" />
              Complete Setup
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= stepNum
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      step > stepNum
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}
