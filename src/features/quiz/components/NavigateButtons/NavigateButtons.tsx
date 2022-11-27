import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import Button from "../../../../components/UI/Button";
import { useNavigateButtons } from "../../hooks/useNavigateButtons";
import { useQuestionIndex } from "../../hooks/useQuestionIndex";
import { useQuiz } from "../../hooks/useQuiz";

import styles from "./navigateButtons.module.scss";

const NavigateButtons = () => {
  const { btnNextActive, btnPreviousActive } = useNavigateButtons();
  const { incrementIndex, decrementIndex } = useQuestionIndex();
  const { isResultsMode } = useQuiz();

  const handleBtnNextClick = () => {
    incrementIndex();
  };

  const handleBtnPreviousClick = () => {
    decrementIndex();
  };

  return (
    <div className={styles.btnContainer}>
      <div>
        {isResultsMode && (
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
        {isResultsMode && (
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
