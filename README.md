# في الطريق (Fe El-Tareeq) — Frontend & Progressive Web App (PWA)

تطبيق ويب تقدمي (PWA) وتطبيق ويب متكامل لمنصة **"في الطريق" (Fe El-Tareeq)**، وهي منصة تشاركية (Peer-to-Peer) لتوصيل الطلبات والمشاوير وتنسيق الرحلات بين المسافرين وأصحاب الحاجيات في قطاع غزة.

---

## 🌟 المميزات الرئيسية (Key Features)

- **📱 تطبيق ويب تقدمي متكامل (PWA & Mobile-First):**
  - تجربة سلسة للأجهزة المحمولة وشاشات سطح المكتب.
  - إمكانية تثبيت التطبيق مباشرة على شاشة الهاتف الرئيسية (Add to Home Screen).
  - شاشة تشغيل أنيقة (Startup Splash Screen) بخلفية بيضاء وشعار رسمي متجاوب.
  - دعم العمل بدون اتصال جزئي وحفظ الملاحظات الصوتية (Voice Notes) محلياً في `localStorage`.

- **🔐 معمارية مصادقة وحماية صارمة (Strict Auth & Routing):**
  - مسارات حماية صارمة (`ProtectedRoute` و `PublicOnlyRoute`).
  - توجيه تلقائي وآمن للزوار غير المسجلين نحو صفحة الهبوط (`/` Landing Page) ثم شاشات تسجيل الدخول (`/login`).
  - تجديد تلقائي لرموز الوصول (JWT Token Auto-Refresh Queue عبر Axios Interceptors).
  - تخزين وحماية الحالة عبر `Zustand` مع `persist` و `localStorage`.

- **📦 إدارة المشاوير والرحلات (Errands & Trips):**
  - إنشاء واستعراض الطلبات والمشاوير مع تحديد الأحياء والمناطق والأوزان.
  - تسجيل ملاحظات صوتية فورية وإرفاقها بالطلب.
  - إضافة الرحلات للمسافرين وتحديد السعات المتاحة والأوقات بدقة.
  - نظام ذكي لمطابقة الرحلات بالطلبات المناسبة في نفس المسار.

- **💬 نظام المحادثة الفورية وتتبع الطلبات (Chat & Order Tracking):**
  - غرف محادثة فورية بين المسافر وطالب الغرض.
  - دعم الرسائل النصية والصوتية.
  - تتبع مراحل الطلب (تقديم عرض، قبول، استلام الغرض، بدء التوصيل، اكتمال التسليم).

- **💰 المحفظة ونظام التوكنز والمدفوعات (Wallet & Tokens System):**
  - تسعير دقيق بالعملة المحلية الشيكل الفلسطيني (**ILS / شيكل**).
  - باقات توكنز متنوعة لإنشاء المشاوير وتقديم العروض.
  - بوابة شحن الرصيد عبر **جوال باي (Jawwal Pay - QR Code)** مع محاكي سداد للاختبار.
  - سجل تفصيلي لجميع الحركات المالية وحركات التوكنز.

- **🌐 نظام ترجمة ذكي ومتكامل لرسائل الـ Backend (`i18n`):**
  - دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (**RTL 100%**).
  - ترجمة تلقائية وشاملة لجميع رسائل النجاح والخطأ الصادرة من الخادم بواسطة `i18next`.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| المجال | التقنيات والمكتبات |
| :--- | :--- |
| **الإطار الأساسي** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 8](https://vitejs.dev/) |
| **التصميم والتنسيق** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/vite` + [Lucide React](https://lucide.dev/) |
| **إدارة الحالة والخادم** | [TanStack React Query v5](https://tanstack.com/query/latest) + [Zustand v5](https://zustand-demo.pmnd.rs/) |
| **الاتصال بالـ API** | [Axios](https://axios-http.com/) (مع Axios Interceptors و Token Refresh Queue) |
| **إدارة النماذج والتحقق** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **التدويل والترجمة** | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) |
| **التنقل والمسارات** | [React Router v7](https://reactrouter.com/) |
| **الاختبارات وضمان الجودة** | [Vitest](https://vitest.dev/) + [Testing Library (React & Jest-DOM)](https://testing-library.com/) |

---

## 📁 هيكل المشروع (Project Structure)

```text
frontend/
├── public/                    # الأيقونات وملف الـ Manifest وشعار التطبيق (logo.png, pwa-*.png)
│   ├── favicon.ico
│   ├── logo.png
│   ├── manifest.json
│   └── sw.js                  # Service Worker لدعم التخزين المؤقت والـ PWA
├── src/
│   ├── api/                   # طبقة الاتصال بالخادم وخدمات الـ API
│   │   ├── client.ts          # عميل Axios مع معالجة الـ 401 وتجديد الـ JWT
│   │   ├── endpoints.ts       # ثوابت مسارات الـ Endpoints
│   │   ├── auth.ts            # خدمات المصادقة والمستخدمين
│   │   ├── locations.ts       # خدمات الأحياء والمناطق
│   │   ├── errands.ts         # خدمات الطلبات والمشاوير
│   │   ├── trips.ts           # خدمات الرحلات
│   │   ├── assignments.ts     # خدمات دورة حياة التعيينات
│   │   ├── chat.ts            # خدمات المحادثة والرسائل
│   │   ├── payments.ts        # خدمات الفواتير والباقات
│   │   ├── wallet.ts          # خدمات المحفظة والتوكنز
│   │   ├── matching.ts        # خدمات المطابقة الذكية
│   │   ├── pricing.ts         # خدمات تسعير التوصيل
│   │   └── ratings.ts         # خدمات التقييم وشارات الثقة
│   ├── components/
│   │   ├── auth/              # مكونات حماية المسارات (ProtectedRoute, PublicOnlyRoute)
│   │   ├── chat/              # مكونات المحادثة والفقاعات الصوتية
│   │   ├── common/            # المكونات العامة (VoiceNoteRecorder, InstallPwaBanner, SplashScreen)
│   │   ├── landing/           # عناصر صفحة الهبوط والترويج
│   │   ├── layout/            # أغلفة التنسيق العام (AppLayout, AuthLayout, MobileContainer, Header, Sidebar)
│   │   └── ui/                # مكتبة مكونات واجهة المستخدم (Button, Card, Input, Alert, EmptyState, إلخ)
│   ├── hooks/                 # React Query Hooks المخصصة لإدارة الـ Server State
│   ├── i18n/                  # إعدادات i18next وكتالوج ترجمة نصوص الخادم
│   ├── pages/                 # كافة شاشات التطبيق (المصادقة، الرحلات، الطلبات، المحفظة، الملف الشخصي، إلخ)
│   ├── store/                 # Zustand Stores (useAuthStore)
│   ├── test/                  # اختبارات Vitest الشاملة للمسارات والواجهات
│   ├── types/                 # تعريفات TypeScript لكافة هياكل البيانات
│   ├── utils/                 # دوال المساعدة، معالجة أخطاء الـ API، وتنسيق التواريخ
│   ├── App.tsx                # خريطة المسارات والتوجيه العام
│   └── main.tsx               # نقطة الانطلاق وإعداد الـ Providers والـ Service Worker
├── DEVELOPER_HANDOFF.md       # دليل تسليم المطورين الشامل وتفاصيل الـ Endpoints
├── package.json
└── vite.config.ts
```

---

## ⚙️ المتغيرات البيئية (Environment Variables)

قم بإنشاء ملف `.env` في المجلد الرئيسي `frontend/.env` مع ضبط القيم التالية:

```env
# رابط خادم الـ REST API الأساسي
VITE_API_BASE_URL=https://fe-el-tareeq-api-staging.onrender.com

# رابط خادم الـ WebSocket للمحادثة الفورية
VITE_SOCKET_URL=wss://fe-el-tareeq-api-staging.onrender.com

# وضع البيئة
VITE_APP_ENV=development

# رقم دعم واتساب
VITE_WHATSAPP_SUPPORT_PHONE=970599123456
```

---

## 🚀 التشغيل والتطوير (Getting Started)

### 1. تثبيت الحزم (Prerequisites & Installation)

تأكد من توفر Node.js (الإصدار 18 أو أحدث) ثم قم بتثبيت الاعتماديات:

```bash
npm install
```

### 2. تشغيل خادم التطوير (Development Server)

```bash
npm run dev
```

سيتم تشغيل التطبيق محلياً على: `http://localhost:5173`

### 3. تشغيل حزمة الاختبارات (Run Tests)

```bash
# تشغيل جميع الاختبارات مرة واحدة
npm test

# تشغيل الاختبارات في وضع المراقبة (Watch Mode)
npm run test:watch
```

### 4. فحص الشيفرة وبناء حزمة الإنتاج (Production Build)

```bash
# فحص Typescript وبناء حزمة الإنتاج عبر Vite
npm run build

# معاينة حزمة الإنتاج محلياً
npm run preview
```

---

## 📱 ميزات PWA والتوافق المحلي (PWA & Offline Capabilities)

- **Service Worker (`public/sw.js`):** يدير التخزين المؤقت للأصول والصفحات لسرعة التحميل.
- **Manifest (`public/manifest.json`):** يحدد اسم التطبيق، الأيقونات الرسمية، ألوان الـ Theme (`#00A859`) ولون الخلفية الأبيض (`#FFFFFF`).
- **تسجيل الصوت أوفلاين (`useVoiceRecorder`):** يدعم تسجيل الملاحظات الصوتية وحفظها بتنسيق Base64 في `localStorage` لضمان استماع ومراجعة المستخدم لتسجيلاته حتى عند انقطاع الاتصال.

---

## 📄 التوثيق الإضافي (Additional Documentation)

- للاطلاع على الدليل التفصيلي لمطابقة وتكامل الـ Endpoints وهياكل البيانات ورسائل الخادم، يرجى مراجعة [DEVELOPER_HANDOFF.md](DEVELOPER_HANDOFF.md).

