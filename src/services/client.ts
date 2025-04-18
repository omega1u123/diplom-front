import { API_ROUTES, BASE_URL } from "@/utils/routesNames";
import { ofetch } from "ofetch";
import type { FetchRequest, FetchOptions, FetchResponse } from "ofetch";

let isTokenRefreshing = false;
let refreshTokenPromise: Promise<void> | null = null;

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
            console.log("Токены обновлены"); // will be removed later
          }
        })
        .finally(() => {
          isTokenRefreshing = false;
        });
    }
  },
});
interface FetchError {
  data?: string;
  response?: {
    status: number;
    _data?: unknown;
    message?: string;
  };
}

export default async <T>(request: FetchRequest, options?: FetchOptions) => {
  try {
    const response = await client.raw(request, options);
    return response as FetchResponse<T>;
  } catch (error: unknown) {
    const fetchError = error as FetchError;
    if (
      fetchError.response?.status === 401 &&
      localStorage.getItem("refreshToken")
    ) {
      if (refreshTokenPromise) {
        await refreshTokenPromise;
      }

      const response = await client.raw(request, options);
      return response as FetchResponse<T>;
    }

    throw error as FetchError;
  }
};

//  токен для тестирования рефреша
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiOGQ3NGQxOGEtNTZhOS00ZDk5LTk4MzctMzk0ZDRmY2M3YTE0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE3Mjg2OTcwMTAsImV4cCI6MTcyODY5ODIxMCwiaXNzIjoiWm9ya2lBUEkiLCJhdWQiOiJab3JraUNsaWVudCJ9.Hqj3QEKH1yvp7u-29Og5lo74AMaM7BV2C8qVA9iv0mw
