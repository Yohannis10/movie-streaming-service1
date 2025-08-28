import React, { useState, useRef } from 'react';
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Camera, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { SignupData } from '../types/movie';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Signup form states
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupData>>({});

  const { login, signup, isLoading, updateUserAvatar } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateSignup = (): boolean => {
    const newErrors: Partial<SignupData> = {};
    
    if (!signupData.name.trim()) newErrors.name = 'Name is required';
    if (!signupData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Email is invalid';
    if (!signupData.password) newErrors.password = 'Password is required';
    else if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let success = false;
    
    if (isLogin) {
      success = await login(username, password);
    } else {
      if (!validateSignup()) return;
      success = await signup(signupData);
    }
    
    if (success) {
      if (profileImage) {
        updateUserAvatar(profileImage);
      }
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-white" />
            )}
          </div>
          <h2 className="text-white text-2xl font-semibold mb-2">
            {isLogin ? username : signupData.name}
          </h2>
          <p className="text-gray-300 text-lg">You have successfully {isLogin ? 'logged in' : 'signed up'}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <button className="text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">Welcome</h1>

            <div className="flex mb-8">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setErrors({});
                }}
                className={`px-6 py-2 font-medium transition-colors ${
                  isLogin
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                }}
                className={`px-6 py-2 font-medium transition-colors ${
                  !isLogin
                    ? 'text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                SIGNUP
              </button>
            </div>

            {!isLogin && (
              <div className="mb-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-gray-400 text-sm">Upload your profile picture</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isLogin ? (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-transparent border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent border border-gray-600 rounded-lg px-10 py-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      className={`w-full bg-transparent border rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      className={`w-full bg-transparent border rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                      }`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      className={`w-full bg-transparent border rounded-lg px-10 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none ${
                        errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      className={`w-full bg-transparent border rounded-lg px-10 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </>
              )}

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'LOGIN' : 'SIGNUP')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:block flex-1 relative">
        <img
          src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/50" />
      </div>
    </div>
  );
};

export default LoginForm;