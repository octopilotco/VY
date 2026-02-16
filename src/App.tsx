import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import InspirationPage from "./pages/dashboard/InspirationPage";
import ContentStudioPage from "./pages/dashboard/ContentStudioPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import LibraryPage from "./pages/dashboard/LibraryPage";
import PostQueuePage from "./pages/dashboard/PostQueuePage";
import SocialHubPage from "./pages/dashboard/SocialHubPage";
import EngagePage from "./pages/dashboard/EngagePage";
import ContextPage from "./pages/dashboard/ContextPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="inspiration" replace />} />
              <Route path="inspiration" element={<InspirationPage />} />
              <Route path="studio" element={<ContentStudioPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="library" element={<LibraryPage />} />
              <Route path="queue" element={<PostQueuePage />} />
              <Route path="social" element={<SocialHubPage />} />
              <Route path="engage" element={<EngagePage />} />
              <Route path="context" element={<ContextPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
