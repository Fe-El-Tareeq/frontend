import axios from "axios";

const BASE_URL = "https://fe-el-tareeq-api-staging.onrender.com";

interface ApiAuditResult {
  endpoint: string;
  method: string;
  status: number | string;
  isWorking: boolean;
  notes: string;
  dataSnippet?: unknown;
}

async function runLiveApiAudit() {
  console.log("=================================================");
  console.log("🔍 STARTING LIVE STAGING API AUDIT");
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log("=================================================\n");

  const results: ApiAuditResult[] = [];

  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 1. Health Endpoint
  try {
    const res = await client.get("/health");
    results.push({
      endpoint: "/health",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200,
      notes: "السيرفر يعمل بنجاح ومتاح",
      dataSnippet: res.data,
    });
  } catch (err: any) {
    results.push({
      endpoint: "/health",
      method: "GET",
      status: err.response?.status || "ERR_NETWORK",
      isWorking: false,
      notes: `خطأ: ${err.message}`,
    });
  }

  // 2. Locations Neighborhoods
  try {
    const res = await client.get("/api/v1/locations/neighborhoods");
    const count = res.data?.data?.neighborhoods?.length ?? 0;
    results.push({
      endpoint: "/api/v1/locations/neighborhoods",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200 && count > 0,
      notes: `تم جلب ${count} حي نشط بنجاح`,
      dataSnippet: res.data?.data?.neighborhoods?.slice(0, 2),
    });
  } catch (err: any) {
    results.push({
      endpoint: "/api/v1/locations/neighborhoods",
      method: "GET",
      status: err.response?.status || "ERR_NETWORK",
      isWorking: false,
      notes: `خطأ: ${err.message}`,
    });
  }

  // 3. Auth: Request OTP
  const testPhone = "0591234567";
  try {
    const res = await client.post("/api/v1/auth/request-otp", {
      phone: testPhone,
    });
    results.push({
      endpoint: "/api/v1/auth/request-otp",
      method: "POST",
      status: res.status,
      isWorking: res.status === 200,
      notes: "تم توليد وإرسال رمز التحقق بنجاح",
      dataSnippet: res.data,
    });
  } catch (err: any) {
    results.push({
      endpoint: "/api/v1/auth/request-otp",
      method: "POST",
      status: err.response?.status || "ERR_NETWORK",
      isWorking: err.response?.status === 400 || err.response?.status === 429,
      notes: err.response?.data?.message || err.message,
    });
  }

  // 4. Auth: Forgot Password
  try {
    const res = await client.post("/api/v1/auth/forgot-password", {
      phone: testPhone,
    });
    results.push({
      endpoint: "/api/v1/auth/forgot-password",
      method: "POST",
      status: res.status,
      isWorking: res.status === 200,
      notes: "تم إرسال رمز استعادة كلمة المرور بنجاح",
      dataSnippet: res.data,
    });
  } catch (err: any) {
    results.push({
      endpoint: "/api/v1/auth/forgot-password",
      method: "POST",
      status: err.response?.status || "ERR_NETWORK",
      isWorking: false,
      notes: err.response?.data?.message || err.message,
    });
  }

  // 5. Auth: Login (With dummy test account)
  try {
    const res = await client.post("/api/v1/auth/login", {
      phone: testPhone,
      password: "InvalidTestPassword123!",
    });
    results.push({
      endpoint: "/api/v1/auth/login",
      method: "POST",
      status: res.status,
      isWorking: true,
      notes: "تم تسجيل الدخول بنجاح",
      dataSnippet: res.data,
    });
  } catch (err: any) {
    // 401 Invalid credentials or 403 Unverified means the API route is functional and validating
    const status = err.response?.status;
    const isWorking = status === 401 || status === 403 || status === 400;
    results.push({
      endpoint: "/api/v1/auth/login",
      method: "POST",
      status: status || "ERR_NETWORK",
      isWorking,
      notes: isWorking
        ? `الـ Endpoint يستجيب ويعالج التحقق: "${err.response?.data?.message || "Invalid credentials"}"`
        : `خطأ غير متوقع: ${err.message}`,
    });
  }

  // 6. Errands: List (Public/Auth)
  try {
    const res = await client.get("/api/v1/errands");
    const count = res.data?.data?.errands?.length ?? 0;
    results.push({
      endpoint: "/api/v1/errands",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200,
      notes: `يستجيب بنجاح، عدد الطلبات الحالية: ${count}`,
      dataSnippet: res.data?.data?.errands?.slice(0, 1),
    });
  } catch (err: any) {
    // Check if 401 Unauthorized
    const status = err.response?.status;
    results.push({
      endpoint: "/api/v1/errands",
      method: "GET",
      status: status || "ERR_NETWORK",
      isWorking: status === 200 || status === 401,
      notes: status === 401 ? "يتطلب تسجيل الدخول (Bearer Token)" : err.message,
    });
  }

  // 7. Trips: List
  try {
    const res = await client.get("/api/v1/trips");
    const count = res.data?.data?.trips?.length ?? 0;
    results.push({
      endpoint: "/api/v1/trips",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200,
      notes: `يستجيب بنجاح، عدد الرحلات الحالية: ${count}`,
    });
  } catch (err: any) {
    const status = err.response?.status;
    results.push({
      endpoint: "/api/v1/trips",
      method: "GET",
      status: status || "ERR_NETWORK",
      isWorking: status === 200 || status === 401,
      notes: status === 401 ? "يتطلب تسجيل الدخول (Bearer Token)" : err.message,
    });
  }

  // 8. Delivery Pricing Quote
  try {
    const res = await client.get("/api/v1/delivery-pricing/quote", {
      params: {
        destinationNeighborhoodId: "60a32850-bd3f-444a-84b4-c750abf6ecb6",
      },
    });
    results.push({
      endpoint: "/api/v1/delivery-pricing/quote",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200,
      notes: "تم حساب تسعيرة التوصيل التلقائية بالشيكل بنجاح",
      dataSnippet: res.data,
    });
  } catch (err: any) {
    const status = err.response?.status;
    results.push({
      endpoint: "/api/v1/delivery-pricing/quote",
      method: "GET",
      status: status || "ERR_NETWORK",
      isWorking: status === 200 || status === 401 || status === 400 || status === 422,
      notes: status === 401 ? "يتطلب توكن المستخدم" : err.response?.data?.message || err.message,
    });
  }

  // 9. Wallet (Protected)
  try {
    const res = await client.get("/api/v1/wallet");
    results.push({
      endpoint: "/api/v1/wallet",
      method: "GET",
      status: res.status,
      isWorking: res.status === 200,
      notes: "تم جلب رصيد المحفظة بنجاح",
    });
  } catch (err: any) {
    const status = err.response?.status;
    results.push({
      endpoint: "/api/v1/wallet",
      method: "GET",
      status: status || "ERR_NETWORK",
      isWorking: status === 401,
      notes: "محمي بحاجز المصادقة (401 Unauthorized كما هو متوقع للطلبات غير المسجلة)",
    });
  }

  // Print Summary Table
  console.log("\n=================================================");
  console.log("📊 LIVE API AUDIT RESULTS SUMMARY");
  console.log("=================================================\n");

  results.forEach((r, idx) => {
    const icon = r.isWorking ? "✅" : "❌";
    console.log(`${idx + 1}. [${r.method}] ${r.endpoint}`);
    console.log(`   ${icon} Status: ${r.status}`);
    console.log(`   📝 Notes: ${r.notes}`);
    if (r.dataSnippet) {
      console.log(`   📦 Sample Data: ${JSON.stringify(r.dataSnippet)}`);
    }
    console.log("-------------------------------------------------");
  });

  return results;
}

runLiveApiAudit();
