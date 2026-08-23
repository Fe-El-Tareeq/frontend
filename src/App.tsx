import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";

// Lazy-loaded pages matching Figma structure
const Home = lazy(() => import("./pages/Home"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const RegisterStep1 = lazy(() => import("./pages/auth/RegisterStep1"));
const RegisterStep2 = lazy(() => import("./pages/auth/RegisterStep2"));
const VerifyOtp = lazy(() => import("./pages/auth/VerifyOtp"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const CreateErrand = lazy(() => import("./pages/errands/CreateErrand"));
const ErrandDetail = lazy(() => import("./pages/errands/ErrandDetail"));
const SubmitOfferPage = lazy(() => import("./pages/errands/SubmitOfferPage"));
const OrderTracking = lazy(() => import("./pages/errands/OrderTracking"));
const RatingPage = lazy(() => import("./pages/errands/RatingPage"));
const MyErrands = lazy(() => import("./pages/errands/MyErrands"));

const TripsPage = lazy(() => import("./pages/trips/TripsPage"));
const CreateTrip = lazy(() => import("./pages/trips/CreateTrip"));
const TripDetailPage = lazy(() => import("./pages/trips/TripDetailPage"));
const RequestSpacePage = lazy(() => import("./pages/trips/RequestSpacePage"));
const MatchFeed = lazy(() => import("./pages/trips/MatchFeed"));

const MessagesPage = lazy(() => import("./pages/chat/MessagesPage"));
const ChatPage = lazy(() => import("./pages/chat/ChatPage"));

const WalletPage = lazy(() => import("./pages/wallet/WalletPage"));
const TopUpQRPage = lazy(() => import("./pages/wallet/TopUpQRPage"));

const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const EditProfile = lazy(() => import("./pages/profile/EditProfile"));
const SettingsPage = lazy(() => import("./pages/profile/SettingsPage"));
const ChangePasswordPage = lazy(() => import("./pages/profile/ChangePasswordPage"));
const NotificationsPage = lazy(() => import("./pages/notifications/NotificationsPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));

// Clean Mobile Loading Fallback
const PageLoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary gap-3">
    <div className="h-14 w-14 rounded-2xl bg-white border border-border shadow-xs flex items-center justify-center">
      <Loader2 className="h-7 w-7 animate-spin text-accent" />
    </div>
    <span className="text-xs font-bold text-text-secondary">
      جاري التحميل...
    </span>
  </div>
);

// Root entry point: Landing page by default at "/", redirected to "/home" if logged in
function RootRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <LandingPage />;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Main Entry Point: Landing Page at "/" (redirects to "/home" if authenticated) */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/home" element={<Home />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />

          {/* Errands Domain */}
          <Route path="/errands" element={<MyErrands />} />
          <Route path="/errands/new" element={<CreateErrand />} />
          <Route path="/create-errand" element={<CreateErrand />} />
          <Route path="/errands/:id" element={<ErrandDetail />} />
          <Route path="/errands/:id/offer" element={<SubmitOfferPage />} />
          <Route path="/errands/:id/tracking" element={<OrderTracking />} />
          <Route path="/errands/:id/rating" element={<RatingPage />} />
          <Route path="/my-errands" element={<MyErrands />} />

          {/* Auth Domain */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-step1" element={<RegisterStep1 />} />
          <Route path="/register-step2" element={<RegisterStep2 />} />
          <Route path="/register" element={<Navigate to="/register-step1" replace />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Trips Domain */}
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/create" element={<CreateTrip />} />
          <Route path="/trips/:id" element={<TripDetailPage />} />
          <Route path="/trips/:id/request-space" element={<RequestSpacePage />} />
          <Route path="/trips/match-feed" element={<MatchFeed />} />

          {/* Chat & Messages Domain */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />

          {/* Wallet Domain */}
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/wallet/topup-qr" element={<TopUpQRPage />} />

          {/* Profile & Settings Domain */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/change-password" element={<ChangePasswordPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;