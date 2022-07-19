import { ANSWERS_NUMBER } from "../constants";
import { Question, Country } from "../redux/quiz/types";
import { getRandomInt } from "./getRandomInt";
import { shuffle } from "./shuffle";

export const generateRandomCapitalQuestion: (array: Country[]) => Question = (
  array
) => {
  const countryIndex = getRandomInt(array.length);

  const { name: countryName, capital } = array[countryIndex];

  const question = `What is the capital of country ${countryName}?`;
  const answers: string[] = [capital];
  const answersIndexArray: number[] = [countryIndex];

  while (answers.length !== ANSWERS_NUMBER) {
    const index = getRandomInt(array.length);

    if (!answersIndexArray.includes(index)) {
      answersIndexArray.push(index);
      const { capital: answer } = array[index];
      answers.push(answer);
    }
  }

  shuffle(answers);

  const correctAnswer = answers.indexOf(capital);
  return { question, answers, correctAnswer, id: countryName };
};

export const generateRandomFlagsQuestion: (array: Country[]) => Question = (
  array
) => {
  const countryIndex = getRandomInt(array.length);
  const { name: countryName, flag } = array[countryIndex];

  const question = "What country does this flag belong to?";
  const answers: string[] = [countryName];
  const answersIndexArray: number[] = [countryIndex];

  while (answers.length !== ANSWERS_NUMBER) {
    const index = getRandomInt(array.length);

    if (!answersIndexArray.includes(index)) {
      answersIndexArray.push(index);
      const { name: answer } = array[index];
      answers.push(answer);
    }
  }

  shuffle(answers);
  const correctAnswer = answers.indexOf(countryName);
  return { question, answers, correctAnswer, id: countryName, img: flag };
};
