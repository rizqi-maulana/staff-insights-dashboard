
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import SharedDashboardPage from "./pages/SharedDashboardPage";
import StaffListPage from "./pages/StaffListPage";
import AddStaffPage from "./pages/AddStaffPage";
import StaffManagementPage from "./pages/StaffManagementPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import StaffDetailsPage from "./pages/StaffDetailsPage";
import NotFound from "./pages/NotFound";
import OfflinePage from "./pages/OfflinePage";

const queryClient = new QueryClient();

const AppContent = () => {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/server" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/shared" element={<SharedDashboardPage />} />
        <Route path="/staff" element={<StaffListPage />} />
        <Route path="/staff/add" element={<AddStaffPage />} />
        <Route path="/staff/edit/:staffId" element={<AddStaffPage />} />
        <Route path="/staff/:staffId" element={<StaffDetailsPage />} />
        <Route path="/staff-management" element={<StaffManagementPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
