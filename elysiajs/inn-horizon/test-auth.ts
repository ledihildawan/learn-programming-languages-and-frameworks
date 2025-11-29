/**
 * Simple test script to verify authentication endpoints
 * Run with: bun run test-auth.ts
 */

const BASE_URL = "http://localhost:3000";

// Helper function to make API requests
async function apiRequest(
  method: string,
  endpoint: string,
  body?: any,
  token?: string
) {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: any = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  return {
    status: response.status,
    data,
  };
}

// Test data
let accessToken = "";
let refreshToken = "";
let userId = "";

async function runTests() {
  console.log("🧪 Starting Authentication Tests\n");

  try {
    // Test 1: Health Check
    console.log("1️⃣  Testing Health Check...");
    const health = await apiRequest("GET", "/health");
    console.log(`   Status: ${health.status}`);
    console.log(`   Response:`, health.data);
    console.log(health.status === 200 ? "   ✅ PASSED\n" : "   ❌ FAILED\n");

    // Test 2: Register Customer
    console.log("2️⃣  Testing Customer Registration...");
    const register = await apiRequest("POST", "/api/auth/register", {
      email: `customer${Date.now()}@test.com`,
      password: "Test1234",
      name: "Test Customer",
      phone: `0812${Date.now().toString().slice(-8)}`,
      role: "CUSTOMER",
    });
    console.log(`   Status: ${register.status}`);
    console.log(`   Success: ${register.data.success}`);
    if (register.data.success) {
      accessToken = register.data.data.tokens.accessToken;
      refreshToken = register.data.data.tokens.refreshToken;
      userId = register.data.data.user.id;
      console.log(`   User ID: ${userId}`);
      console.log(`   Role: ${register.data.data.user.role}`);
    }
    console.log(
      register.status === 201 && register.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 3: Get Current User
    console.log("3️⃣  Testing Get Current User...");
    const me = await apiRequest("GET", "/api/auth/me", undefined, accessToken);
    console.log(`   Status: ${me.status}`);
    console.log(`   Success: ${me.data.success}`);
    if (me.data.success) {
      console.log(`   Email: ${me.data.data.email}`);
      console.log(`   Role: ${me.data.data.role}`);
      console.log(`   Verified: ${me.data.data.isVerified}`);
    }
    console.log(
      me.status === 200 && me.data.success ? "   ✅ PASSED\n" : "   ❌ FAILED\n"
    );

    // Test 4: Update Profile
    console.log("4️⃣  Testing Update Profile...");
    const updateProfile = await apiRequest(
      "PUT",
      "/api/users/profile",
      {
        name: "Test Customer Updated",
      },
      accessToken
    );
    console.log(`   Status: ${updateProfile.status}`);
    console.log(`   Success: ${updateProfile.data.success}`);
    if (updateProfile.data.success) {
      console.log(`   Updated Name: ${updateProfile.data.data.name}`);
    }
    console.log(
      updateProfile.status === 200 && updateProfile.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 5: Change Password
    console.log("5️⃣  Testing Change Password...");
    const changePassword = await apiRequest(
      "POST",
      "/api/auth/change-password",
      {
        currentPassword: "Test1234",
        newPassword: "NewTest1234",
      },
      accessToken
    );
    console.log(`   Status: ${changePassword.status}`);
    console.log(`   Success: ${changePassword.data.success}`);
    console.log(
      changePassword.status === 200 && changePassword.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 6: Login with new password
    console.log("6️⃣  Testing Login with New Password...");
    const meData = await apiRequest("GET", "/api/auth/me", undefined, accessToken);
    const email = meData.data.data.email;

    const login = await apiRequest("POST", "/api/auth/login", {
      email: email,
      password: "NewTest1234",
    });
    console.log(`   Status: ${login.status}`);
    console.log(`   Success: ${login.data.success}`);
    if (login.data.success) {
      accessToken = login.data.data.tokens.accessToken;
      refreshToken = login.data.data.tokens.refreshToken;
      console.log(`   Received new tokens`);
    }
    console.log(
      login.status === 200 && login.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 7: Refresh Token
    console.log("7️⃣  Testing Refresh Token...");
    const refresh = await apiRequest("POST", "/api/auth/refresh", {
      refreshToken: refreshToken,
    });
    console.log(`   Status: ${refresh.status}`);
    console.log(`   Success: ${refresh.data.success}`);
    if (refresh.data.success) {
      console.log(`   Received new access token`);
    }
    console.log(
      refresh.status === 200 && refresh.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 8: Register Host
    console.log("8️⃣  Testing Host Registration...");
    const registerHost = await apiRequest("POST", "/api/auth/register", {
      email: `host${Date.now()}@test.com`,
      password: "Host1234",
      name: "Test Host",
      phone: `0813${Date.now().toString().slice(-8)}`,
      role: "HOST",
      bankName: "Bank Mandiri",
      bankCode: "008",
      accountNumber: "1234567890",
      accountName: "Test Host",
    });
    console.log(`   Status: ${registerHost.status}`);
    console.log(`   Success: ${registerHost.data.success}`);
    if (registerHost.data.success) {
      console.log(`   Role: ${registerHost.data.data.user.role}`);
      console.log(`   Bank Name: ${registerHost.data.data.user.bankName}`);
      console.log(
        `   Account Number: ${registerHost.data.data.user.accountNumber}`
      );
    }
    console.log(
      registerHost.status === 201 && registerHost.data.success
        ? "   ✅ PASSED\n"
        : "   ❌ FAILED\n"
    );

    // Test 9: Test Invalid Token
    console.log("9️⃣  Testing Invalid Token (Should Fail)...");
    const invalidToken = await apiRequest(
      "GET",
      "/api/auth/me",
      undefined,
      "invalid-token-here"
    );
    console.log(`   Status: ${invalidToken.status}`);
    console.log(`   Success: ${invalidToken.data.success}`);
    console.log(
      invalidToken.status === 401 && !invalidToken.data.success
        ? "   ✅ PASSED (Correctly rejected)\n"
        : "   ❌ FAILED\n"
    );

    // Test 10: Test Duplicate Email (Should Fail)
    console.log("🔟 Testing Duplicate Email Registration (Should Fail)...");
    const duplicate = await apiRequest("POST", "/api/auth/register", {
      email: email, // Use email from Test 2
      password: "Test1234",
      name: "Duplicate User",
      phone: `0814${Date.now().toString().slice(-8)}`,
      role: "CUSTOMER",
    });
    console.log(`   Status: ${duplicate.status}`);
    console.log(`   Success: ${duplicate.data.success}`);
    console.log(
      duplicate.status === 400 && !duplicate.data.success
        ? "   ✅ PASSED (Correctly rejected)\n"
        : "   ❌ FAILED\n"
    );

    console.log("\n" + "=".repeat(50));
    console.log("🎉 All tests completed!");
    console.log("=".repeat(50));
  } catch (error) {
    console.error("\n❌ Error running tests:", error);
  }
}

// Run the tests
console.log("Starting server test...\n");
console.log("Make sure the server is running on " + BASE_URL + "\n");
console.log("=".repeat(50) + "\n");

runTests();
