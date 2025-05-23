import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/API/baseQuery";
import {
  OrderForm,
  PaidService,
  PaidServiceForm,
  User,
  UserRatingResponse,
  UserUpdate,
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
    getIsPaidSub: builder.query<
      { isSubscribed: boolean },
      { subscriberId: string; targetUserId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/is-paidSubscribed`,
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
    getPaidSub: builder.mutation<
      void,
      { subscriberId: string; targetUserId: string }
    >({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}/paidSubscribe`,
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
    updateUser: builder.mutation<User, UserUpdate>({
      query: (data) => ({
        url: `${BASE_URL}${API_ROUTES.USER.BASE}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetRatingUsersQuery,
  useGetUserByIdQuery,
  useGetIsSubQuery,
  useGetIsPaidSubQuery,
  useGetSubMutation,
  useGetPaidSubMutation,
  useGetUnSubMutation,
  useCreateServiceMutation,
  useGetServicesByUserIdQuery,
  useCreateOrderMutation,
  useUpdateUserMutation,
} = userApi;
