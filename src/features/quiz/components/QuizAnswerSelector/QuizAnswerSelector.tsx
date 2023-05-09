import { useCallback } from "react";

import { useQuiz } from "../../hooks/useQuiz";
import { useQuizQuestion } from "../../hooks/useQuizQuestion";
import { useSetAnswerMutation } from "../../quizService";
import AnswerSelector from "../AnswerSelector";

const QuizAnswerSelector = () => {
  const { isResultsMode } = useQuiz();
  const { currentQuestion, answer, setIsAnswered } = useQuizQuestion();

  const [setAnswer] = useSetAnswerMutation({});

  const { id, title, img, correctAnswer, answers } = currentQuestion!;

  const handleAnswerSelect = useCallback(
    async (answer: string) => {
      await setAnswer({ answerId: answer });
      setIsAnswered();
    },
    [setIsAnswered, setAnswer]
  );

  if (!currentQuestion) {
    return null;
  }

  return (
    <AnswerSelector
      key={id}
      onAnswerSelect={handleAnswerSelect}
      answer={answer}
      correctAnswer={correctAnswer}
      disabled={isResultsMode}
    >
      <AnswerSelector.Question title={title} img={img} />
      <AnswerSelector.AnswersContainer>
        {answers.map((answer, index) => (
          <AnswerSelector.Answer
            key={answer.id}
            id={answer.id}
            index={index}
            value={answer.value}
          />
        ))}
      </AnswerSelector.AnswersContainer>
    </AnswerSelector>
  );
};

export default QuizAnswerSelector;
