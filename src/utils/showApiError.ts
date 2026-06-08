/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-hot-toast";

export const showApiError = (error: any) => {
  const message =
    error?.data?.errorSources?.[0]?.message ||
    error?.data?.message ||
    error?.message ||
    "Something went wrong";

  toast.error(message);
};
