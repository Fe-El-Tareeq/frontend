import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { ProtectedRoute, PublicOnlyRoute } from "./components/auth/ProtectedRoute";

// Lazy-loaded pages matching Figma structure
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
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
const IncomingOffersPage = lazy(() => import("./pages/errands/IncomingOffersPage"));
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
const BuyTokensPackages = lazy(() => import("./pages/wallet/BuyTokensPackages"));
const PaymentMethodPage = lazy(() => import("./pages/wallet/PaymentMethodPage"));
const TopUpQRPage = lazy(() => import("./pages/wallet/TopUpQRPage"));
const PaymentSuccessPage = lazy(() => import("./pages/wallet/PaymentSuccessPage"));

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
          {/* Public Landing & Info Routes */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="/landing" element={<Navigate to="/" replace />} />

          {/* Public-Only Auth Routes (Redirects to /home if already logged in) */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register-step1"
            element={
              <PublicOnlyRoute>
                <RegisterStep1 />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register-step2"
            element={
              <PublicOnlyRoute>
                <RegisterStep2 />
              </PublicOnlyRoute>
            }
          />
          <Route path="/register" element={<Navigate to="/register-step1" replace />} />
          <Route
            path="/verify-otp"
            element={
              <PublicOnlyRoute>
                <VerifyOtp />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicOnlyRoute>
                <ResetPassword />
              </PublicOnlyRoute>
            }
          />

          {/* ========================================================================= */}
          {/* ALL PROTECTED PLATFORM ROUTES (Requires Authentication, else redirects /login) */}
          {/* ========================================================================= */}

          {/* Home Dashboard */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Errands Domain */}
          <Route
            path="/errands"
            element={
              <ProtectedRoute>
                <MyErrands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-errands"
            element={
              <ProtectedRoute>
                <MyErrands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/new"
            element={
              <ProtectedRoute>
                <CreateErrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-errand"
            element={
              <ProtectedRoute>
                <CreateErrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/incoming-offers"
            element={
              <ProtectedRoute>
                <IncomingOffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/:id"
            element={
              <ProtectedRoute>
                <ErrandDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/:id/offer"
            element={
              <ProtectedRoute>
                <SubmitOfferPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/:id/offers"
            element={
              <ProtectedRoute>
                <IncomingOffersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/:id/tracking"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/errands/:id/rating"
            element={
              <ProtectedRoute>
                <RatingPage />
              </ProtectedRoute>
            }
          />

          {/* Trips Domain */}
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <TripsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/new"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/create"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id"
            element={
              <ProtectedRoute>
                <TripDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id/request-space"
            element={
              <ProtectedRoute>
                <RequestSpacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/match-feed"
            element={
              <ProtectedRoute>
                <MatchFeed />
              </ProtectedRoute>
            }
          />

          {/* Chat & Messages Domain */}
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Wallet & Multi-Step Purchase Flow */}
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/buy-tokens"
            element={
              <ProtectedRoute>
                <BuyTokensPackages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/payment-method"
            element={
              <ProtectedRoute>
                <PaymentMethodPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/topup-qr"
            element={
              <ProtectedRoute>
                <TopUpQRPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />

          {/* Profile & Settings Domain */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;