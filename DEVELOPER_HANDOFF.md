# دليل المطورين لربط الواجهة الأمامية بالـ Backend: نظام "في الطريق" (Fe El-Tareeq)

مرحباً بك في مستودع الواجهة الأمامية لتطبيق **في الطريق (Fe El-Tareeq)**.
تم بناء هذا المشروع ليكون معيارياً (Modular)، عالي الأداء، ومصمماً وفق معايير **Mobile-First** باستخدام **React 19 + TypeScript + Tailwind CSS v4 + TanStack React Query + Zustand**.

---

## 🏗️ 1. المعمارية وهيكل المجلدات (Project Structure)

```
frontend/
├── .env.example               # نموذج المتغيرات البيئية
├── src/
│   ├── api/                   # طبقة الاتصال بالسيرفر و Axios Interceptors
│   │   ├── client.ts          # عميل Axios مع تجديد تلقائي لـ JWT Token (401 queue)
│   │   ├── endpoints.ts       # الثوابت المركزية لمسارات الـ Endpoints
│   │   ├── auth.ts            # خدمات المصادقة
│   │   ├── locations.ts       # خدمات المواقع والأحياء
│   │   ├── errands.ts         # خدمات الطلبات والمشاوير
│   │   └── wallet.ts          # خدمات المحفظة والعملات
│   ├── components/
│   │   ├── layout/            # أغلفة التخطيط العام (AppLayout, AuthLayout, MobileContainer, BottomNav, Header)
│   │   └── ui/                # مكتبة المكونات المركبة (Card, Form, Button, Input, Badges)
│   ├── hooks/                 # React Query Custom Hooks لإدارة الـ Server State
│   │   ├── useAuth.ts
│   │   ├── useLocations.ts
│   │   ├── useErrands.ts
│   │   └── useWallet.ts
│   ├── store/                 # Zustand Stores للحالة العامة (useAuthStore مع LocalStorage)
│   ├── types/                 # تعريفات TypeScript المطابقة لـ OpenAPI و DTOs
│   ├── pages/                 # كافة شاشات التطبيق (مقسمة حسب الدومين)
│   │   ├── auth/              # Welcome, Login, RegisterStep1, RegisterStep2, VerifyOtp, ForgotPassword, ResetPassword
│   │   ├── trips/             # TripsPage, CreateTrip, TripDetailPage, RequestSpacePage
│   │   ├── chat/              # MessagesPage, ChatPage
│   │   ├── wallet/            # WalletPage, TopUpQRPage
│   │   ├── profile/           # ProfilePage, EditProfile, SettingsPage, ChangePasswordPage
│   │   ├── notifications/     # NotificationsPage
│   │   └── legal/             # TermsPage
│   ├── App.tsx                # إعداد المسارات والتقسيم البرمجي
│   └── index.css              # إعدادات Tailwind v4
```

---

## 🚦 2. مصفوفة شاشات Figma والـ Endpoints المطلوبة (25 شاشة)

|  #  | شاشة Figma                  | ملف الواجهة الأمامية                       | المسار في التطبيق           | الـ Endpoint المطلوب                                  |    حالة الربط بالـ Backend    |
| :-: | :-------------------------- | :----------------------------------------- | :-------------------------- | :---------------------------------------------------- | :---------------------------: |
|  1  | **بطاقة التعريف**           | `src/pages/LandingPage.tsx`                | `/` أو `/welcome`           | واجهة ثابتة واستعراضية                                |             مكتمل             |
|  2  | **الرئيسية**                | `src/pages/Home.tsx`                       | `/` (عند تسجيل الدخول)      | `GET /api/v1/dashboard/summary` + `GET /api/v1/trips` |             مكتمل             |
|  3  | **القائمة الجانبية**        | `src/components/layout/Sidebar.tsx`        | Drawer من كل الصفحات        | `GET /api/v1/users/me`                                |             مكتمل             |
|  4  | **تسجيل الدخول**            | `src/pages/auth/Login.tsx`                 | `/login`                    | `POST /api/v1/auth/login`                             |             مكتمل             |
|  5  | **تسجيل حساب جديد 1**       | `src/pages/auth/RegisterStep1.tsx`         | `/register-step1`           | Client Step State                                     |             مكتمل             |
|  6  | **تسجيل حساب جديد 2**       | `src/pages/auth/RegisterStep2.tsx`         | `/register-step2`           | `POST /api/v1/auth/register`                          |             مكتمل             |
|  7  | **تأكيد OTP / نسيت المرور** | `src/pages/auth/VerifyOtp.tsx`             | `/verify-otp`               | `POST /api/v1/auth/verify-otp`                        |             مكتمل             |
|  8  | **تعيين كلمة مرور جديدة**   | `src/pages/auth/ResetPassword.tsx`         | `/reset-password`           | `POST /api/v1/auth/reset-password`                    | 🟡 بانتظار Endpoint الباك إند |
|  9  | **الطلبات**                 | `src/pages/errands/MyErrands.tsx`          | `/errands`                  | `GET /api/v1/errands`                                 |             مكتمل             |
| 10  | **إنشاء طلب جديد**          | `src/pages/errands/CreateErrand.tsx`       | `/errands/new`              | `POST /api/v1/errands`                                |             مكتمل             |
| 11  | **تفاصيل الطلب**            | `src/pages/errands/ErrandDetail.tsx`       | `/errands/:id`              | `GET /api/v1/errands/:id`                             |             مكتمل             |
| 12  | **تقديم عرض للطلب**         | `src/pages/errands/SubmitOfferPage.tsx`    | `/errands/:id/offer`        | `POST /api/v1/errands/:id/offers`                     | 🟡 بانتظار Endpoint الباك إند |
| 13  | **الرحلات**                 | `src/pages/trips/TripsPage.tsx`            | `/trips`                    | `GET /api/v1/trips`                                   | 🟡 بانتظار Endpoint الباك إند |
| 14  | **إضافة رحلة جديدة**        | `src/pages/trips/CreateTrip.tsx`           | `/trips/new`                | `POST /api/v1/trips`                                  | 🟡 بانتظار Endpoint الباك إند |
| 15  | **تفاصيل الرحلة**           | `src/pages/trips/TripDetailPage.tsx`       | `/trips/:id`                | `GET /api/v1/trips/:id`                               | 🟡 بانتظار Endpoint الباك إند |
| 16  | **طلب مكان بالرحلة**        | `src/pages/trips/RequestSpacePage.tsx`     | `/trips/:id/request-space`  | `POST /api/v1/trips/:id/book`                         | 🟡 بانتظار Endpoint الباك إند |
| 17  | **قائمة الرسائل**           | `src/pages/chat/MessagesPage.tsx`          | `/messages`                 | `GET /api/v1/conversations`                           | 🟡 بانتظار Endpoint الباك إند |
| 18  | **صفحة المحادثة**           | `src/pages/chat/ChatPage.tsx`              | `/chat/:id`                 | `GET /api/v1/chat/:id/messages`                       |   🟡 بانتظار WebSocket/API    |
| 19  | **المحفظة وسجل العمليات**   | `src/pages/wallet/WalletPage.tsx`          | `/wallet`                   | `GET /api/v1/wallet/ledger`                           |     مكتمل (Mock fallback)     |
| 20  | **الملف الشخصي**            | `src/pages/profile/ProfilePage.tsx`        | `/profile`                  | `GET /api/v1/users/me`                                |             مكتمل             |
| 21  | **تعديل الملف الشخصي**      | `src/pages/profile/EditProfile.tsx`        | `/profile/edit`             | `PATCH /api/v1/users/me`                              |             مكتمل             |
| 22  | **الإعدادات والتنبيهات**    | `src/pages/profile/SettingsPage.tsx`       | `/settings`                 | `PATCH /api/v1/users/settings`                        | 🟡 بانتظار Endpoint الباك إند |
| 23  | **تغيير كلمة المرور**       | `src/pages/profile/ChangePasswordPage.tsx` | `/settings/change-password` | `PUT /api/v1/auth/change-password`                    | 🟡 بانتظار Endpoint الباك إند |

---

## 📌 3. النواقص المطلوبة من فريق الـ Backend (Missing Endpoints)

تم تصميم وتطبيق كافة الشاشات والنماذج في الواجهة الأمامية، وتبقى تفعيل الـ Endpoints التالية من طرف الـ Backend لربطها بالكامل:

1. **إدارة عروض التوصيل على الطلبات:**
   - `POST /api/v1/errands/:id/offers` (تقديم عرض من مسافر مع السعر المقترح والوقت والتسجيل الصوتي).
2. **إدارة حجز مكان في الرحلات:**
   - `POST /api/v1/trips/:id/book` (طلب حجز مساحة طرد من مسافر مع نقطة الالتقاء).
3. **رفع الرسائل الصوتية (Voice Memos):**
   - `POST /api/v1/upload/audio` (رفع ملف صوتي واسترجاع رابط الـ URL لتضمينه في الطلبات والعروض).
4. **حفظ تفضيلات الإشعارات والمظهر:**
   - `PATCH /api/v1/users/settings` (تحديث تفضيلات الإشعارات للرحلات والرسائل والطلبات).
5. **تغيير كلمة المرور بحساب مسجل:**

---

## 🛠️ 4. كيفية إضافة وتفعيل Endpoint جديد في 3 خطوات بسيطة

عندما ينتهي فريق الـ Backend من أي Endpoint، اتبع الخطوات التالية:

### الخطوة 1: تسجيل مسار الـ Endpoint في `src/api/endpoints.ts`:

```typescript
export const API_ENDPOINTS = {
  // ...
  TRIPS: {
    CREATE: "/api/v1/trips",
    MATCHES: (tripId: string) => `/api/v1/trips/${tripId}/matches`,
  },
};
```

### الخطوة 2: كتابة دالة الخدمة في مجلد `src/api/`:

```typescript
// src/api/trips.ts
import apiClient from "./client";
import { API_ENDPOINTS } from "./endpoints";
import type {
  ApiResponse,
  CreateTripRequestDTO,
  TripResponseDTO,
} from "../types";

export const tripsApi = {
  createTrip: async (
    payload: CreateTripRequestDTO,
  ): Promise<TripResponseDTO> => {
    const res = await apiClient.post<ApiResponse<TripResponseDTO>>(
      API_ENDPOINTS.TRIPS.CREATE,
      payload,
    );
    return res.data.data;
  },
};
```

### الخطوة 3: إنشاء Hook بـ React Query واستدعاؤه في الصفحة:

```typescript
// src/hooks/useTrips.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tripsApi } from "../api/trips";

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: tripsApi.createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};
```

---

## ⚠️ 4. هيكل أخطاء الـ Backend وطريقة معالجتها (ApiErrorResponse)

يعتمد الـ Backend على نمطين من الاستجابة للأخطاء:

### أ) في حالة أخطاء التحقق من الحقول (Validation Errors):

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "body.phone",
      "message": "رقم الهاتف مسجل مسبقاً أو غير صالح"
    }
  ]
}
```

### ب) في حالة الأخطاء العامة (General Errors):

```json
{
  "success": false,
  "message": "كلمة المرور غير صحيحة",
  "errors": []
}
```

---

### 🛡️ دوال المعالجة المتاحة في الواجهة الأمامية (`src/utils/apiError.ts`):

1. **استخراج رسالة خطأ واحدة واضحة (`getApiErrorMessage`):**

```typescript
import { getApiErrorMessage } from "../utils/apiError";

try {
  await login(data);
} catch (err: unknown) {
  const message = getApiErrorMessage(err, "تعذر تسجيل الدخول");
  setErrorMessage(message);
}
```

2. **ربط أخطاء الحقول تلقائياً مع React Hook Form (`getApiFieldErrors`):**

```typescript
import { getApiFieldErrors, getApiErrorMessage } from "../utils/apiError";

try {
  await registerApi(data);
} catch (err: unknown) {
  // 1. استخراج وتعيين الأخطاء على الحقول مباشرة (مثل body.phone -> phone)
  const fieldErrors = getApiFieldErrors(err);
  Object.entries(fieldErrors).forEach(([field, message]) => {
    setError(field as any, { type: "server", message });
  });

  // 2. تعيين رسالة الخطأ العامة إن لم تكن متعلقة بحقل معين
  setErrorMessage(getApiErrorMessage(err));
}
```

---

## ⚙️ 5. المتغيرات البيئية (Environment Variables)

قم بإنشاء ملف `.env` في المجلد الرئيسي للواجهة الأمامية (`frontend/.env`):

```env
# رابط الـ REST API الأساسي
VITE_API_BASE_URL=https://fe-el-tareeq-api-staging.onrender.com

# رابط سيرفر الـ WebSocket للمحادثة والتتبع المباشر
VITE_SOCKET_URL=wss://fe-el-tareeq-api-staging.onrender.com

# وضع البيئة
VITE_APP_ENV=development

# رقم واتساب للدعم والمحادثة الاحتياطية (بدون علامة +)
VITE_WHATSAPP_SUPPORT_PHONE=970599123456
```

---

## 🚀 5. الأوامر الأساسية للتشغيل والتحقق

```bash
# تشغيل خادم التطوير المحلي
npm run dev

# فحص وتجميع المشروع للإنتاج (Type-check & Bundle)
npm run build

# معاينة حزمة الإنتاج محلياً
npm run preview
```
