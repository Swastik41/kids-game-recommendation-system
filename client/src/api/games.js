// client/src/api/games.js

// API ka base URL
// Same pattern as auth.js: http://localhost:5000/api
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Common helper function for all game API calls
async function apiCall(endpoint, options = {}) {
  console.log(
    `🔄 API Call: ${options.method || "GET"} ${API_BASE_URL}${endpoint}`
  );

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : null;

    if (!res.ok) {
      // backend se agar error aya toh proper message show kare
      throw new Error(
        data?.error || data?.message || `HTTP ${res.status} - ${res.statusText}`
      );
    }

    console.log(
      `✅ API Success: ${options.method || "GET"} ${endpoint}`,
      data
    );
    return data;
  } catch (error) {
    console.error(
      `❌ API Error: ${options.method || "GET"} ${endpoint}`,
      error.message
    );
    throw error;
  }
}

// Yeh object tum pura app me use karoge
export const GamesAPI = {
  // GET /api/games  → saare games laata hai
  getAll: () => apiCall("/games"),

  // GET /api/games/:id → ek particular game
  getById: (id) => apiCall(`/games/${id}`),

  // POST /api/games → naya game create
  // AdminDashboard me jo payload bhej rahe ho (title, primary_genre, genres, thumbnail_url, platform_type, etc.)
  create: (gameData) =>
    apiCall("/games", {
      method: "POST",
      body: gameData,
    }),

  // PUT /api/games/:id → existing game update
  update: (id, gameData) =>
    apiCall(`/games/${id}`, {
      method: "PUT",
      body: gameData,
    }),

  // DELETE /api/games/:id → game delete
  delete: (id) =>
    apiCall(`/games/${id}`, {
      method: "DELETE",
    }),
};
