'use client';

import { useState, useEffect } from 'react';
import useUser from '@/utils/useUser';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Zap, 
  Star, 
  ChevronRight,
  Play,
  Clock,
  Target,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

export default function HomePage() {
  const { data: user, loading } = useUser();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Get personalized lessons and instant help from our AI tutor",
      icon: Zap,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Uganda Curriculum Aligned",
      description: "Content perfectly matched to Uganda's National Curriculum",
      icon: BookOpen,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Multi-Language Support",
      description: "Learn in English, Luganda, Runyankole, and more",
      icon: Globe,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Offline Learning",
      description: "Download lessons and study without internet connection",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const stats = [
    { label: "Students Learning", value: "10,000+", icon: Users },
    { label: "Lessons Available", value: "500+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: Trophy },
    { label: "Languages", value: "3+", icon: Globe }
  ];

  const subjects = [
    { name: "Mathematics", icon: "📊", color: "bg-red-100 text-red-600", students: "2,500+" },
    { name: "English", icon: "📚", color: "bg-blue-100 text-blue-600", students: "3,200+" },
    { name: "Science", icon: "🔬", color: "bg-green-100 text-green-600", students: "1,800+" },
    { name: "Social Studies", icon: "🌍", color: "bg-yellow-100 text-yellow-600", students: "1,500+" },
    { name: "Luganda", icon: "🗣️", color: "bg-purple-100 text-purple-600", students: "900+" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Redirect authenticated users with profiles to dashboard
  useEffect(() => {
    if (!loading && user?.profile) {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#subjects" className="text-gray-600 hover:text-gray-900 transition-colors">Subjects</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href="/account/signin"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="/account/signup"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Learn Smarter with
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}AI-Powered Education
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Personalized learning aligned with Uganda's National Curriculum. 
                Study anywhere, anytime with AI tutoring and offline support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="/account/signup"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Start Learning Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 transition-all flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>10,000+ students</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Progress</h3>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Mathematics</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div className="w-3/4 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">English</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div className="w-1/2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Science</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div className="w-5/6 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-purple-900">AI Tutor available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Uganda Learn?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with deep understanding of Uganda's educational needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    activeFeature === index
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex space-x-2">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <Smartphone className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">AI Tutor</div>
                      <div className="text-white">How can I help you learn today?</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-300 mb-2">Student Question:</div>
                    <div className="text-white">"Can you explain photosynthesis in simple terms?"</div>
                  </div>
                  
                  <div className="bg-purple-600/20 rounded-lg p-4">
                    <div className="text-sm text-purple-300 mb-2">AI Response:</div>
                    <div className="text-white">
                      "Photosynthesis is like cooking for plants! They use sunlight, water, and air to make their own food..."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Subjects We Cover
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive curriculum for Primary, Secondary, and University levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${subject.color}`}>
                    {subject.students}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Active learners</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students already learning smarter with Uganda Learn
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/account/signup"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Start Learning Today
            </a>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 transition-all">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Uganda Learn</span>
              </div>
              <p className="text-gray-400">
                Empowering Ugandan students with AI-powered education aligned to the national curriculum.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subjects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Tutor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Uganda Learn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}