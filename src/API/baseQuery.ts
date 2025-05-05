import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { FetchResponse } from "ofetch";
import { toast } from "react-toastify";
import { ErrorMessages } from "@/utils/formMessages";
import client from "@/services/client";
import { clearAuthState } from "@/store/slices/authSlice";
import { Action } from "@reduxjs/toolkit";

let injectedDispatch: ((action: Action) => void) | null = null;

export const injectStore = (dispatch: (action: Action) => void) => {
  injectedDispatch = dispatch;
};

type BaseQueryArgs =
  | string
  | {
      url: string;
      body?: unknown;
      method?: string;
      headers?: Record<string, string>;
    };

export const baseQuery: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async <
  T
>(
  args: BaseQueryArgs
): Promise<{ data: T } | { error: unknown }> => {
  const {
    url,
    body,
    method = "GET",
    headers = {},
  } = typeof args === "string" ? { url: args } : args;

  const statusMessageMap = new Map<number, string>([
    [400, ErrorMessages.REQUEST_ERROR],
    [401, ErrorMessages.REQUEST_ERROR],
    [500, ErrorMessages.SERVER_ERROR],
  ]);

  try {
    const response: FetchResponse<T> = await client(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
      },
    });

    return { data: response._data as T };
  } catch (error) {
    const fetchError = error as {
      data?: string;
      response?: { status: number; _data: string };
    };

    const regularError = error as Error;
    const status = fetchError.response?.status;
    const message = fetchError.response?._data || fetchError.data;

    if (status) {
      const errorMessage =
        message ||
        regularError.message ||
        statusMessageMap.get(status) ||
        ErrorMessages.ERROR_UNKNOWN;

      if (status === 401 || errorMessage === "Неверный токен обновления") {
        if (injectedDispatch) {
          injectedDispatch(clearAuthState());
        }
      }

      toast.error(errorMessage);

      return {
        error: { status, message: errorMessage },
      };
    }

    toast.error(message || regularError.message || ErrorMessages.ERROR_UNKNOWN);
    return {
      error: {
        status: status,
        message:
          message ||
          regularError.message ||
          fetchError?.response?._data ||
          ErrorMessages.ERROR_UNKNOWN,
      },
    };
  }
};
