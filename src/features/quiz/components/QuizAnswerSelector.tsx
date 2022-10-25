import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { useQuizContext } from "../contexts/QuizContext";
import {
  selectCurrentQuestion,
  selectQuizAnswers,
} from "../services/selectors";
import { setAnswer } from "../services/slice";
import { Question } from "../services/types";

import AnswerSelector from "./AnswerSelector/AnswerSelector";

const QuizAnswerSelector = () => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const answers = useAppSelector(selectQuizAnswers);

  const dispatch = useAppDispatch();

  const { resultsViewMode } = useQuizContext();

  const handleAnswerSelect = (answerIndex: number) => {
    dispatch(setAnswer((currentQuestion as Question).id, answerIndex));
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <AnswerSelector
      id={currentQuestion.id}
      onSelect={handleAnswerSelect}
      answer={answers[currentQuestion.id]}
      correctAnswer={currentQuestion.correctAnswer}
      mode={resultsViewMode ? "review" : "selection"}
    >
      <AnswerSelector.Question img={currentQuestion.img}>
        {currentQuestion.question}
      </AnswerSelector.Question>
      <AnswerSelector.AnswersContainer>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerSelector.Answer key={answer} index={index}>
            {answer}
          </AnswerSelector.Answer>
        ))}
      </AnswerSelector.AnswersContainer>
    </AnswerSelector>
  );
};

export default QuizAnswerSelector;
