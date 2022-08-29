import { useState, useEffect } from "react";
import { useAppSelector } from "../../../services/hooks";
import { selectCurrentIndex } from "../services/selectors";
import { selectCurrentSettings } from "../../settings/services/selectors";

export const useNavigateButtons = (isResultPage: boolean) => {
  const [btnPreviousActive, setBtnPreviousActive] = useState<boolean>(false);
  const [btnNextActive, setBtnNextActive] = useState<boolean>(false);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const { questionAmount } = useAppSelector(selectCurrentSettings);

  useEffect(() => {
    if (isResultPage) {
      if (currentIndex === 0) {
        setBtnPreviousActive(false);
      } else {
        setBtnPreviousActive(true);
      }
      if (currentIndex === questionAmount - 1) {
        setBtnNextActive(false);
      } else setBtnNextActive(true);
    } else {
      setBtnNextActive(false);
    }
  }, [currentIndex]);

  return [
    [btnPreviousActive, setBtnPreviousActive],
    [btnNextActive, setBtnNextActive],
  ] as [boolean, React.Dispatch<React.SetStateAction<boolean>>][];
};
