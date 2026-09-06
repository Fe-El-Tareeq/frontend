# دليل المطورين الشامل لتكامل الواجهة الأمامية بالـ Backend: نظام "في الطريق" (Fe El-Tareeq)

مرحباً بك في مستودع الواجهة الأمامية لتطبيق **في الطريق (Fe El-Tareeq)**.
تم بناء هذا المشروع ليكون معيارياً (Modular)، عالي الأداء، ومصمماً وفق معايير **Mobile-First & PWA** باللغة العربية (RTL) باستخدام:
**React 19 + TypeScript + Vite + Tailwind CSS v4 + TanStack React Query + Zustand + i18next + Vitest**.

---

## 🏗️ 1. المعمارية وهيكل المجلدات (Project Structure)

```
frontend/
├── .env.example               # نموذج المتغيرات البيئية
├── src/
│   ├── api/                   # طبقة الاتصال بالسيرفر و Axios Interceptors والخدمات
│   │   ├── client.ts          # عميل Axios مع تجديد تلقائي لـ JWT Token (401 refresh queue)
│   │   ├── endpoints.ts       # الثوابت المركزية لمسارات الـ Endpoints
│   │   ├── auth.ts            # خدمات المصادقة واستعادة الحساب والملف الشخصي
│   │   ├── locations.ts       # خدمات المواقع والأحياء النشطة
│   │   ├── errands.ts         # خدمات إنشاء وإدارة وإلغاء الطلبات
│   │   ├── trips.ts           # خدمات إنشاء وإدارة وإلغاء الرحلات
│   │   ├── assignments.ts     # دورة حياة التعيينات (قبول، استلام، توصيل، إكمال، إلغاء)
│   │   ├── chat.ts            # خدمات المحادثة والرسائل النصية والصوتية والمزامنة
│   │   ├── ratings.ts         # خدمات إرسال واستعراض التقييمات وشارات الثقة
│   │   ├── matching.ts        # خدمات مطابقة الرحلات بالطلبات والعكس
│   │   ├── pricing.ts         # خدمات تسعير التوصيل وعروض الأسعار
│   │   ├── payments.ts        # خدمات باقات التوكنز وفواتير الدفع ومحاكاة السداد
│   │   └── wallet.ts          # خدمات رصيد المحفظة وسجل حركات التوكنز
│   ├── components/
│   │   ├── layout/            # أغلفة التخطيط العام (AppLayout, AuthLayout, MobileContainer, BottomNav, Header, Sidebar)
│   │   ├── ui/                # مكتبة المكونات المركبة (Card, Form, Button, Input, Badges, Alert, EmptyState, ErrorState)
│   │   ├── common/            # مكونات مشتركة (VoiceNoteRecorder, InstallPwaBanner, SplashScreen)
│   │   └── chat/              # مكونات المحادثة والفقاعات الصوتية (ChatMessageBubble)
│   ├── hooks/                 # React Query Custom Hooks لإدارة الـ Server State
│   │   ├── useAuth.ts         # إدارة جلسة المستخدم واستعادة كلمة المرور والصورة الشخصية
│   │   ├── useLocations.ts    # جلب الأحياء والمناطق
│   │   ├── useErrands.ts      # إدارة الطلبات والمشاوير
│   │   ├── useTrips.ts        # إدارة الرحلات والسعات
│   │   ├── useAssignments.ts  # إدارة دورة حياة التعيينات
│   │   ├── useChat.ts         # إدارة الغرف والمراسلة
│   │   ├── useRatings.ts      # إدارة التقييمات والشارات
│   │   ├── usePayments.ts     # إدارة الباقات والفواتير والسداد
│   │   ├── useMatching.ts     # إدارة المطابقات
│   │   ├── usePricing.ts      # حساب أسعار التوصيل
│   │   ├── useWallet.ts       # رصيد المحفظة وسجل الحركات
│   │   └── useVoiceRecorder.ts# تسجيل وحفظ الملاحظات الصوتية في الـ LocalStorage للأوفلاين
│   ├── i18n/                  # نظام الترجمة المعتمد عبر i18next و React-i18next
│   │   ├── catalog.ts         # كتالوج الترجمات المعتمد لرسائل الأخطاء والنجاح بالكامل
│   │   ├── config.ts          # إعداد i18next ودوال الترجمة translateApiMessage & translateSuccessMessage
│   │   └── index.ts           # تصدير إعدادات ودوال الترجمة
│   ├── store/                 # Zustand Stores للحالة العامة (useAuthStore مع LocalStorage)
│   ├── types/                 # تعريفات TypeScript المطابقة لـ Backend API Integration Guide
│   │   ├── api.ts             # مغلفات الاستجابة والأخطاء والترقيم
│   │   ├── auth.ts            # بيانات الحسابات والمصادقة والملف الشخصي
│   │   ├── locations.ts       # بيانات الأحياء والمناطق
│   │   ├── errands.ts         # بيانات الطلبات والمشاوير
│   │   ├── trips.ts           # بيانات الرحلات والسعات
│   │   ├── assignments.ts     # بيانات التعيينات ودورة حياتها
│   │   ├── chat.ts            # بيانات المحادثات والرسائل النصية والصوتية
│   │   ├── ratings.ts         # بيانات التقييمات والشارات والوسوم
│   │   ├── payments.ts        # بيانات الفواتير وباقات التوكنز
│   │   ├── pricing.ts         # بيانات تسعير التوصيل
│   │   ├── matching.ts        # بيانات درجات المطابقة والترتيب
│   │   └── wallet.ts          # بيانات المحفظة وحركات التوكنز
│   ├── utils/
│   │   ├── apiError.ts        # استخراج وترجمة رسائل الأخطاء التلقائية getApiErrorMessage & getApiFieldErrors
│   │   └── date.ts            # دوال تنسيق التواريخ العربية
│   ├── pages/                 # كافة شاشات التطبيق (25 شاشة ومسار)
│   ├── test/                  # حزمة الاختبارات الشاملة (Vitest & Testing Library)
│   ├── App.tsx                # إعداد المسارات والتوجيه الحصين
│   └── main.tsx               # نقطة الانطلاق وإعداد Service Worker و i18n
```

---

## 🚦 2. مصفوفة الشاشات والـ Endpoints المكتملة بالتطبيق

|  #  | شاشة التطبيق | ملف الواجهة الأمامية | المسار | الـ Backend Endpoint المرتبط | حالة التكامل |
| :-: | :--- | :--- | :--- | :--- | :---: |
| 1 | **بطاقة التعريف والترحيب** | `src/pages/LandingPage.tsx` | `/` (غير مسجل) | واجهة تعريفية وتحميل الـ PWA | ✅ مكتمل |
| 2 | **الرئيسية (Dashboard)** | `src/pages/Home.tsx` | `/` (مسجل) | `GET /api/v1/errands` + `GET /api/v1/trips` + `GET /api/v1/users/me` | ✅ مكتمل |
| 3 | **القائمة الجانبية** | `src/components/layout/Sidebar.tsx` | Drawer عام | `GET /api/v1/users/me` + `GET /api/v1/wallet` | ✅ مكتمل |
| 4 | **تسجيل الدخول** | `src/pages/auth/Login.tsx` | `/login` | `POST /api/v1/auth/login` | ✅ مكتمل |
| 5 | **تسجيل حساب (خطوة 1)** | `src/pages/auth/RegisterStep1.tsx` | `/register-step1` | Client Form Validation | ✅ مكتمل |
| 6 | **تسجيل حساب (خطوة 2)** | `src/pages/auth/RegisterStep2.tsx` | `/register-step2` | `POST /api/v1/auth/register` + `GET /api/v1/locations/neighborhoods` | ✅ مكتمل |
| 7 | **تأكيد الرمز (OTP)** | `src/pages/auth/VerifyOtp.tsx` | `/verify-otp` | `POST /api/v1/auth/verify-otp` + `POST /api/v1/auth/request-otp` | ✅ مكتمل |
| 8 | **نسيت كلمة المرور** | `src/pages/auth/ForgotPassword.tsx` | `/forgot-password` | `POST /api/v1/auth/forgot-password` | ✅ مكتمل |
| 9 | **تعيين كلمة مرور جديدة** | `src/pages/auth/ResetPassword.tsx` | `/reset-password` | `POST /api/v1/auth/reset-password` | ✅ مكتمل |
| 10 | **قائمة الطلبات** | `src/pages/errands/MyErrands.tsx` | `/errands` | `GET /api/v1/errands` (مع فلترة الأحياء والحالة والترقيم) | ✅ مكتمل |
| 11 | **إنشاء طلب جديد** | `src/pages/errands/CreateErrand.tsx` | `/errands/new` | `POST /api/v1/errands` (خصم 1 توكن + UUID حي + تسجيل صوتي) | ✅ مكتمل |
| 12 | **تفاصيل الطلب** | `src/pages/errands/ErrandDetail.tsx` | `/errands/:id` | `GET /api/v1/errands/:id` + `POST /api/v1/errands/:id/cancel` | ✅ مكتمل |
| 13 | **تقديم عرض وتعيين** | `src/pages/errands/SubmitOfferPage.tsx` | `/errands/:id/offer` | `POST /api/v1/assignments` (ربط الطلب برحلة المسافر) | ✅ مكتمل |
| 14 | **تتبع الطلب والتعيين** | `src/pages/errands/OrderTracking.tsx` | `/errands/:id/tracking` | `GET /api/v1/assignments/:id` + `pickup` + `start-delivery` + `complete` | ✅ مكتمل |
| 15 | **تقييم التوصيل** | `src/pages/errands/RatingPage.tsx` | `/errands/:id/rate` | `POST /api/v1/ratings` (نجوم، وسوم، ملاحظات، طريقة الدفع) | ✅ مكتمل |
| 16 | **قائمة الرحلات** | `src/pages/trips/TripsPage.tsx` | `/trips` | `GET /api/v1/trips` (مع فلترة البحث والمواعيد) | ✅ مكتمل |
| 17 | **إضافة رحلة جديدة** | `src/pages/trips/CreateTrip.tsx` | `/trips/new` | `POST /api/v1/trips` (سعات، مواعيد بتوقيت ISO، وجهة) | ✅ مكتمل |
| 18 | **تفاصيل الرحلة** | `src/pages/trips/TripDetailPage.tsx` | `/trips/:id` | `GET /api/v1/trips/:id` + `PATCH /api/v1/trips/:id` + `cancel` | ✅ مكتمل |
| 19 | **طلب مساحة بالرحلة** | `src/pages/trips/RequestSpacePage.tsx` | `/trips/:id/request-space` | `GET /api/v1/delivery-pricing/quote` + `POST /api/v1/assignments` | ✅ مكتمل |
| 20 | **المطابقات الذكية** | `src/pages/trips/MatchFeed.tsx` | `/matches` | `GET /api/v1/matching/errands/:id` + `GET /api/v1/matching/trips/:id` | ✅ مكتمل |
| 21 | **قائمة المحادثات** | `src/pages/chat/MessagesPage.tsx` | `/messages` | `GET /api/v1/chat-rooms` | ✅ مكتمل |
| 22 | **غرفة المحادثة الحية** | `src/pages/chat/ChatPage.tsx` | `/chat/:id` | `GET /chat-rooms/:id/messages` + `POST messages` + `sync` + `read` | ✅ مكتمل |
| 23 | **المحفظة وسجل الحركات** | `src/pages/wallet/WalletPage.tsx` | `/wallet` | `GET /api/v1/wallet` + `GET /api/v1/wallet/transactions` | ✅ مكتمل |
| 24 | **شراء باقات التوكنز** | `src/pages/wallet/BuyTokensPackages.tsx` | `/wallet/buy-tokens` | `GET /api/v1/payments/packages` (الأسعار بالشيكل ILS) | ✅ مكتمل |
| 25 | **اختيار وسيلة الدفع** | `src/pages/wallet/PaymentMethodPage.tsx` | `/wallet/payment-method` | `POST /api/v1/payments/invoices` (جوال باي نشط والبنك قريباً) | ✅ مكتمل |
| 26 | **رمز الدفع QR & محاكاة** | `src/pages/wallet/TopUpQRPage.tsx` | `/wallet/top-up-qr` | `GET /api/v1/payments/invoices/:id` + `POST mock/invoices/:id/pay` | ✅ مكتمل |
| 27 | **نجاح عملية الدفع** | `src/pages/wallet/PaymentSuccessPage.tsx` | `/wallet/success` | `GET /api/v1/wallet` (عرض الرصيد المحدث بالشيكل والتوكنز) | ✅ مكتمل |
| 28 | **الملف الشخصي والصورة** | `src/pages/profile/ProfilePage.tsx` | `/profile` | `GET /api/v1/users/me` + `PUT /users/me/profile-image` (Multipart) | ✅ مكتمل |
| 29 | **تعديل الملف الشخصي** | `src/pages/profile/EditProfile.tsx` | `/profile/edit` | `PATCH /api/v1/users/me` (تحديث الاسم والحي السكني) | ✅ مكتمل |
| 30 | **الإعدادات والتنبيهات** | `src/pages/profile/SettingsPage.tsx` | `/settings` | تخطيط RTL كامل، روابط التثبيت، واللغة والإشعارات | ✅ مكتمل |
| 31 | **الشروط والأحكام** | `src/pages/legal/TermsPage.tsx` | `/terms` | صفحة قانونية استعراضية | ✅ مكتمل |

---

## 🌐 3. نظام الترجمة التلقائي لرسائل الـ Backend (`i18n`)

تم دمج مكتبة `i18next` و `react-i18next` مع كتالوج ترجمة شامل يغطي **100% من نصوص الخادم** المذكورة في دليل التكامل:

### أ) بنية الكتالوج (`src/i18n/catalog.ts` & `src/i18n/config.ts`):
- ترجمة مباشرة ومطابقة تامة لنصوص الأخطاء الإنجليزية (مع أو بدون نقطة ختامية).
- دعم **المطابقة بالأنماط الديناميكية ذات المتغيرات** (مثل: نصوص المسارات، مدد التسجيل الصوتي بالثواني، المهل الزمنية للمغادرة بالأيام والدقائق، حالات الفواتير).
- ترجمة جميع رسائل النجاح (`SUCCESS_TRANSLATIONS`).

### ب) المعالجة التلقائية للأخطاء في الواجهات (`src/utils/apiError.ts`):
- دالة `getApiErrorMessage(error)` تستخرج رسالة الخطأ من `response.data.errors` أو `response.data.message` وتقوم بترجمتها للعربية الفصحى تلقائياً.
- دالة `getApiFieldErrors(error)` تستخرج أخطاء الحقول المحددة مثل `body.phone` وتحولها إلى `{ phone: "رقم الهاتف قصير جداً." }` لربطها المباشر مع `react-hook-form`.

```typescript
import { getApiErrorMessage, getApiFieldErrors } from "../utils/apiError";

try {
  await createErrand(data);
} catch (err: unknown) {
  // يرجع رسالة عربية مترجمة من كتالوج السيرفر مباشرة
  const errorMsg = getApiErrorMessage(err);
  setErrorMessage(errorMsg);
}
```

---

## 🎙️ 4. الملاحظات الصوتية ودعم العمل أوفلاين (Voice Notes & Offline PWA)

- **المسجل الصوتي (`VoiceNoteRecorder.tsx` + `useVoiceRecorder.ts`):**
  - يعتمد على `MediaRecorder API` الفعلي لتسجيل الصوت بصيغة `audio/webm`.
  - يوفر مشغلاً صوتياً تفاعلياً مع عداد للوقت ومؤشر للتشغيل والإيقاف وإعادة التسجيل.
  - يقوم بتحويل المقطع الصوتي إلى Base64 وتخزينه في `localStorage` (`btareeqak_voice_${key}`) لضمان إمكانية الاستماع والمراجعة في وضع عدم الاتصال (Offline) في الويب وتطبيق الـ PWA.

---

## 💰 5. قواعد العملات والمدفوعات (Currency & Payment Rules)

- **العملة المعتمدة:** الشيكل الفلسطيني (**ILS / NIS / شيكل**) في كافة شاشات الباقات، الفواتير، أسعار التوصيل، ورصيد المحفظة.
- **طرق الدفع:**
  - **جوال باي (Jawwal Pay - QR Code):** هي وسيلة الدفع النشطة للشحن السريع.
  - **التحويل البنكي (Bank Transfer):** معطل مؤقتاً وموسوم بشارة «قريباً».
  - **البطاقة البنكية (Credit Card):** تمت إزالتها لتناسب طبيعة السوق المحلي في غزة.

---

## ⚙️ 6. المتغيرات البيئية (Environment Variables)

قم بإنشاء ملف `.env` في مسار `frontend/.env`:

```env
# رابط الـ REST API الأساسي
VITE_API_BASE_URL=https://fe-el-tareeq-api-staging.onrender.com

# رابط سيرفر الـ WebSocket للمحادثة
VITE_SOCKET_URL=wss://fe-el-tareeq-api-staging.onrender.com

# وضع البيئة
VITE_APP_ENV=development

# رقم دعم واتساب
VITE_WHATSAPP_SUPPORT_PHONE=970599123456
```

---

## 🚀 7. أوامر التشغيل والتحقق والاختبار

```bash
# 1. تشغيل خادم التطوير المحلي
npm run dev

# 2. تشغيل حزمة الاختبارات الشاملة (10 ملفات اختبار - 41 اختباراً)
npm test

# 3. فحص الـ Typescript وتجميع حزمة الإنتاج (Production Build)
npm run build

# 4. معاينة حزمة الإنتاج
npm run preview
```
