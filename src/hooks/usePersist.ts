import { useState } from "react";

export const usePersist = () => {
  const [persist, setPersist] = useState<boolean>(
    JSON.parse((localStorage.getItem("persist") as string) ?? false)
  );

  const setPersistState = (persist: boolean) => {
    setPersist(persist);
    localStorage.setItem("persist", JSON.stringify(persist));
  };

  const clearPersist = () => {
    localStorage.removeItem("persist");
  };

  return {
    persist,
    setPersist: setPersistState,
    clearPersist,
  };
};
