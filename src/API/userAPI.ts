import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import {
  OrderForm,
  PaidService,
  PaidServiceForm,
  User,
  UserRatingResponse,
} from "@/types/userTypes";
import { API_ROUTES, BASE_URL } from "@/utils/routesNames";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["Users", "Services", "Orders"],
  endpoints: (builder) => ({
    getRatingUsers: builder.query<
      UserRatingResponse,
      { page: number; pageSize: number }
    >({
      query: (args = { page: 1, pageSize: 9999 }) => ({
        url: `${BASE_URL}${API_ROUTES.USER.RATING}`,
        params: args,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getIsSub: builder.query<
      { isSubscribed: boolean },
      { subscriberId: string; targetUserId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/is-subscribed`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Users"],
    }),
    getSub: builder.mutation<
      void,
      { subscriberId: string; targetUserId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/subscribe`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getUnSub: builder.mutation<
      void,
      { subscriberId: string; targetUserId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/unsubscribe`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    createService: builder.mutation<void, PaidServiceForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.SERVICE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    getServicesByUserId: builder.query<PaidService[], string>({
      query: (id) => ({
        url: `${BASE_URL}${API_ROUTES.USER.SERVICE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    createOrder: builder.mutation<void, OrderForm>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.ORDER}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetRatingUsersQuery,
  useGetUserByIdQuery,
  useGetIsSubQuery,
  useGetSubMutation,
  useGetUnSubMutation,
  useCreateServiceMutation,
  useGetServicesByUserIdQuery,
  useCreateOrderMutation,
} = userApi;
