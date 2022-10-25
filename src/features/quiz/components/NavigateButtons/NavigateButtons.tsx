import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import Button from "../../../../components/UI/Button";
import { useAppDispatch } from "../../../../store/hooks";
import { useQuizContext } from "../../contexts/QuizContext";
import { useNavigateButtons } from "../../hooks/useNavigateButtons";
import { decrement, increment } from "../../services/slice";

import styles from "./navigateButtons.module.scss";

const NavigateButtons = () => {
  const { btnNextActive, btnPreviousActive } = useNavigateButtons();
  const { resultsViewMode } = useQuizContext();

  const dispatch = useAppDispatch();

  const handleBtnNextClick = () => {
    dispatch(increment());
  };

  const handleBtnPreviousClick = () => {
    dispatch(decrement());
  };

  return (
    <div className={styles.btnContainer}>
      <div>
        {resultsViewMode && (
          <Button
            onClick={handleBtnPreviousClick}
            buttonType="outlined"
            buttonSize="large"
            startIcon={<AiFillCaretLeft />}
            disabled={!btnPreviousActive}
          >
            Previous
          </Button>
        )}
      </div>
      <div className="d-flex">
        {resultsViewMode && (
          <Link to="/" className={`${styles.backToMenuBtn} me-5`}>
            <Button buttonSize="large">Back to menu</Button>
          </Link>
        )}
        <Button
          onClick={handleBtnNextClick}
          buttonType="primary"
          buttonSize="large"
          endIcon={<AiFillCaretRight />}
          disabled={!btnNextActive}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default NavigateButtons;
