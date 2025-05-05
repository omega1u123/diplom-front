import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../utils/routesNames";
import { baseQuery } from "@/API/baseQuery";
import { LoginForm, RegisterForm } from "@/types/authTypes";

export const BASE_URL = import.meta.env.VITE_ZORKI_BASE_URL || "/api";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginForm>({
      query: (credentials) => ({
        url: `${BASE_URL}${API_ROUTES.AUTH.LOGIN}`,
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: [{ type: "Auth" }],
    }),
    register: builder.mutation<void, RegisterForm>({
      query: (credentials) => ({
        url: `${BASE_URL}${API_ROUTES.AUTH.LOGIN}`,
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
