import { useToast } from "@toast/context";
import { ERROR_TOAST_TIME } from "@config/toast";
import { getErrorMessage } from "@utils/functions";
import { useCallback } from "react";

export const useErrorNotifier = (props?: { duration: number }) => {
  const toast: any = useToast();

  const notifyError = useCallback(
    (error, action = "perform action") => {
      const title =
        typeof error.data === "string" ? error.data : `Could not ${action}`;

      console.warn(`Could not ${action}`);
      console.error(error);

      toast?.pushError({
        title: title,
        message: getErrorMessage(error),
        lifetime: props?.duration || ERROR_TOAST_TIME,
      });
    },
    [props?.duration, toast?.pushError]
  );

  return { notifyError };
};
