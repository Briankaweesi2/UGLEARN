'use client';

import { useState, useEffect } from 'react';
import useUser from '@/utils/useUser';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Star,
  Bell,
  Search,
  ChevronRight,
  Play,
  Zap,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const { data: user, loading } = useUser();
  const [greeting, setGreeting] = useState('Good morning');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

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
      color: "bg-red-500",
      icon: "📊",
      nextLesson: "Algebra Basics",
      timeLeft: "15 min"
    },
    {
      id: 2,
      name: "English Language",
      progress: 60,
      color: "bg-blue-500",
      icon: "📚",
      nextLesson: "Grammar Rules",
      timeLeft: "25 min"
    },
    {
      id: 3,
      name: "Science",
      progress: 85,
      color: "bg-green-500",
      icon: "🔬",
      nextLesson: "Chemical Reactions",
      timeLeft: "30 min"
    },
  ];

  const quickActions = [
    {
      title: "AI Tutor",
      description: "Get instant help",
      icon: Zap,
      color: "bg-purple-500",
      action: () => alert("AI Tutor coming soon!")
    },
    {
      title: "Practice Quiz",
      description: "Test your knowledge",
      icon: Target,
      color: "bg-green-500",
      action: () => alert("Quiz feature coming soon!")
    },
    {
      title: "Study Plan",
      description: "View your schedule",
      icon: Calendar,
      color: "bg-blue-500",
      action: () => alert("Study plan coming soon!")
    },
    {
      title: "Achievements",
      description: "Check your badges",
      icon: Award,
      color: "bg-yellow-500",
      action: () => alert("Achievements coming soon!")
    },
  ];

  const upcomingLessons = [
    {
      subject: "Mathematics",
      topic: "Quadratic Equations",
      time: "10:00 AM",
      duration: "45 min",
      color: "bg-red-100 text-red-800"
    },
    {
      subject: "Science",
      topic: "Photosynthesis",
      time: "2:00 PM", 
      duration: "30 min",
      color: "bg-green-100 text-green-800"
    },
    {
      subject: "English",
      topic: "Essay Writing",
      time: "4:00 PM",
      duration: "60 min",
      color: "bg-blue-100 text-blue-800"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to continue</h1>
          <a
            href="/account/signin"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Uganda Learn</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.profile?.full_name?.charAt(0) || user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">
                  {user.profile?.full_name || user.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting}, {user.profile?.full_name?.split(' ')[0] || user.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Progress</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{todayStats.studyTime}m</div>
                  <div className="text-sm text-purple-700">Study Time</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{todayStats.lessonsCompleted}</div>
                  <div className="text-sm text-green-700">Lessons</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{todayStats.points}</div>
                  <div className="text-sm text-yellow-700">Points</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                  <Star className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{todayStats.streak}</div>
                  <div className="text-sm text-red-700">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity group`}
                  >
                    <action.icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-semibold mb-1">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Learning */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentSubjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                          {subject.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-600">Next: {subject.nextLesson}</p>
                          <div className="flex items-center mt-2">
                            <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                              <div 
                                className={`h-2 ${subject.color} rounded-full`}
                                style={{ width: `${subject.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{subject.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">{subject.timeLeft}</div>
                        <button className={`${subject.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center`}>
                          <Play className="w-4 h-4 mr-1" />
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Lessons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              
              <div className="space-y-3">
                {upcomingLessons.map((lesson, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{lesson.topic}</h4>
                        <p className="text-sm text-gray-600">{lesson.subject}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${lesson.color}`}>
                        {lesson.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 mr-3" />
                <div>
                  <h3 className="font-semibold">Next Achievement</h3>
                  <p className="text-sm opacity-90">Study Streak Master</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2" style={{ width: '70%' }}></div>
              </div>
              <p className="text-sm opacity-90">3 more days to unlock!</p>
            </div>

            {/* Study Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Study Time</span>
                  <span className="font-semibold">4h 32m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lessons Completed</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quiz Score Avg</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rank</span>
                  <span className="font-semibold text-purple-600">#12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}