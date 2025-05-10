import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES, BASE_URL } from "../utils/routesNames";
import { baseQuery } from "@/API/baseQuery";
import { LoginForm, RegisterForm } from "@/types/authTypes";
import { User } from "@/types/userTypes";

export interface AuthResponse {
  id: string;
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
        url: `${BASE_URL}${API_ROUTES.AUTH.REGISTER}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Auth" }],
    }),
    getInfo: builder.query<User, string>({
      query: (credentials) => ({
        url: `${BASE_URL}${API_ROUTES.AUTH.GET_INFO}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials}`,
        },
      }),
      providesTags: [{ type: "Auth" }],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetInfoQuery } =
  authApi;
