import { useCallback } from "react";

import { useQuiz } from "../../hooks/useQuiz";
import { useQuizQuestion } from "../../hooks/useQuizQuestion";
import { useSetAnswerMutation } from "../../quizService";
import AnswerSelector from "../AnswerSelector";

const QuizAnswerSelector = () => {
  const { isResultsMode } = useQuiz();
  const { currentQuestion, setIsAnswered } = useQuizQuestion();

  const [setAnswer] = useSetAnswerMutation({});

  const { id, title, img, correctAnswer, answers } = currentQuestion!;

  const handleAnswerSelect = useCallback(
    (answer: string) => {
      setIsAnswered();
      setAnswer({ answerId: answer });
    },
    [setIsAnswered, setAnswer]
  );

  if (!currentQuestion) {
    //something went wrong
    return null;
  }

  return (
    <AnswerSelector
      questionId={id}
      onAnswerSelect={handleAnswerSelect}
      //answer={answers[currentQuestion.id]}
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
