import axios from "axios";

const BASE_URL = "https://fe-el-tareeq-api-staging.onrender.com";

async function testOtpAndProtectedEndpoints() {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  const phone = "0593566640"; // recently created in previous step
  const otps = ["123456", "000000", "111111", "999999", "654321"];

  let tokens: any = null;

  for (const otp of otps) {
    try {
      const res = await client.post("/api/v1/auth/verify-otp", { phone, otp });
      console.log(`✅ Success with OTP ${otp}:`, res.data);
      tokens = res.data?.data;
      break;
    } catch (err: any) {
      console.log(
        `❌ OTP ${otp} failed:`,
        err.response?.data?.message || err.message,
      );
    }
  }

  if (tokens?.accessToken) {
    console.log("\n🔑 Testing Protected Endpoints with Access Token:");
    const authClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    try {
      const meRes = await authClient.get("/api/v1/users/me");
      console.log("✅ [GET] /api/v1/users/me:", meRes.status, meRes.data);
    } catch (e: any) {
      console.log("❌ /api/v1/users/me failed:", e.response?.data || e.message);
    }

    try {
      const walletRes = await authClient.get("/api/v1/wallet");
      console.log("✅ [GET] /api/v1/wallet:", walletRes.status, walletRes.data);
    } catch (e: any) {
      console.log("❌ /api/v1/wallet failed:", e.response?.data || e.message);
    }

    try {
      const tripsRes = await authClient.get("/api/v1/trips");
      console.log("✅ [GET] /api/v1/trips:", tripsRes.status, tripsRes.data);
    } catch (e: any) {
      console.log("❌ /api/v1/trips failed:", e.response?.data || e.message);
    }
  }
}

testOtpAndProtectedEndpoints();
