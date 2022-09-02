import { useEffect } from "react";

export const useOutsideClickEffect = (callback: () => void, deps: any[]) => {
  useEffect(() => {
    document.body.addEventListener("click", callback);
    return () => {
      document.body.removeEventListener("click", callback);
    };
  }, [...deps]);
};
