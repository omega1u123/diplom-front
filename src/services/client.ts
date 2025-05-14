import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { ofetch } from "ofetch";
import type { FetchRequest, FetchOptions, FetchResponse } from "ofetch";
import { clearAuthState } from "@/store/slices/authSlice";
import { injectedDispatch } from "@/API/baseQuery";

let isTokenRefreshing = false;
let refreshTokenPromise: Promise<void> | null = null;

const refreshTokenLogic = async () => {
  if (isTokenRefreshing) return refreshTokenPromise;

  isTokenRefreshing = true;
  refreshTokenPromise = ofetch(`${API_ROUTES.AUTH.REFRESH_TOKEN}`, {
    baseURL: BASE_URL,
    method: "POST",
    body: {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
    },
  })
    .then(({ accessToken, refreshToken }) => {
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Tokens refreshed successfully");
      }
    })
    .catch((error) => {
      console.error("Token refresh failed:", error);
      injectedDispatch?.(clearAuthState()); // Clear auth state on failure
    })
    .finally(() => {
      isTokenRefreshing = false;
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};

// Create client with interceptors
const client = ofetch.create({
  async onRequest({ options }) {
    const accessToken = localStorage.getItem("accessToken");
    const headers = new Headers();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("Content-Type", "application/json");
      options.headers = headers;
    }
  },

  async onResponse({ response }) {
    if (
      response.status === 401 &&
      localStorage.getItem("refreshToken") &&
      !isTokenRefreshing
    ) {
      console.log("401 detected in client.ts");
      await refreshTokenLogic(); // Handle token refresh
    }
  },

  async onRequestError({ error }) {
    // Detect CORS/network errors [[1]][[5]]
    const errorMessage = error.message || "";
    if (
      errorMessage.includes("CORS") ||
      errorMessage.includes("NetworkError")
    ) {
      console.log("CORS/network error detected");
      if (localStorage.getItem("refreshToken")) {
        await refreshTokenLogic(); // Attempt token refresh
      }
    }
  },
});

// Extended fetch wrapper with retry logic
export default async <T>(request: FetchRequest, options?: FetchOptions) => {
  try {
    const response = await client.raw(request, options);
    return response as FetchResponse<T>;
  } catch (error: unknown) {
    const fetchError = error as {
      response?: { status: number };
      message?: string;
    };

    // Handle both CORS and explicit 401 [[6]]
    const isCorsOr401 =
      fetchError.response?.status === 401 ||
      fetchError.message?.includes("CORS") ||
      fetchError.message?.includes("NetworkError");

    if (isCorsOr401 && localStorage.getItem("refreshToken")) {
      await refreshTokenLogic(); // Wait for token refresh

      // Retry request with new token
      const newAccessToken = localStorage.getItem("accessToken");
      if (newAccessToken) {
        const retryHeaders = {
          ...options?.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        const retryResponse = await client.raw(request, {
          ...options,
          headers: retryHeaders,
        });
        return retryResponse as FetchResponse<T>;
      }
    }

    throw error; // Propagate other errors
  }
};
