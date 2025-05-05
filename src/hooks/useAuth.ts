import { useLoginMutation } from "@/API/authAPI";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearAuthState, setAuthState } from "@/store/slices/authSlice";
import { LoginForm } from "@/types/authTypes";
import { LoginMessages } from "@/utils/formMessages";
import { saveToLocalStorage } from "@/utils/localStorageUtils";
import { routesNames } from "@/utils/routesNames";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFetchBaseQueryError = (
    error: unknown
  ): error is FetchBaseQueryError =>
    typeof error === "object" && error !== null && "status" in error;

  const isErrorWithMessage = (error: unknown): error is { message: string } =>
    typeof error === "object" && error !== null && "message" in error;

  const auth = async (values: LoginForm) => {
    try {
      const data = await login(values).unwrap();
      saveToLocalStorage({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      dispatch(setAuthState({ isAuth: true }));
      toast.success(LoginMessages.LOGIN_SUCCESS);
      navigate(routesNames.recipesPath);
    } catch (error: unknown) {
      dispatch(clearAuthState());
      if (isFetchBaseQueryError(error)) {
        const errorMessage = error.data as string;
        toast.error(errorMessage);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.message || "Неизвестная ошибка");
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
    }
  };

  return { auth, loading: isLoading };
};
