import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CourseLearning = lazy(() => import("./pages/CourseLearning"));
const Consultations = lazy(() => import("./pages/Consultations"));
const EngineerDetail = lazy(() => import("./pages/EngineerDetail"));
const SchoolSponsors = lazy(() => import("./pages/SchoolSponsors"));
const Profile = lazy(() => import("./pages/Profile"));
const LearnFromBest = lazy(() => import("./pages/LearnFromBest"));
const Projects = lazy(() => import("./pages/Projects"));
const GameLearning = lazy(() => import("./pages/GameLearning"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/course/:id/learn/:lessonId" element={<CourseLearning />} />
              <Route path="/consultations" element={<Consultations />} />
              <Route path="/engineer/:id" element={<EngineerDetail />} />
              <Route path="/sponsors" element={<SchoolSponsors />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/game-learning" element={<GameLearning />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn-from-best" element={<LearnFromBest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
