import { ANSWERS_NUMBER } from "../constants";
import { Question, Country } from "../redux/quiz/types";
import { getRandomInt } from "./getRandomInt";
import { shuffle } from "./shuffle";

const getValidCountryIndex = (countries: Country[]) => {
  while (true) {
    const index = getRandomInt(countries.length);
    if (countries[index].capital) return index;
  }
};

export const generateRandomCapitalQuestion: (
  countries: Country[]
) => Question = (countries) => {
  const countryIndex = getValidCountryIndex(countries);

  const { name: countryName, capital } = countries[countryIndex];

  const question = `What is the capital of country ${countryName}?`;
  const answers: string[] = [capital];
  const answersIndexcountries: number[] = [countryIndex];

  while (answers.length !== ANSWERS_NUMBER) {
    const index = getValidCountryIndex(countries);

    if (!answersIndexcountries.includes(index)) {
      answersIndexcountries.push(index);
      const { capital: answer } = countries[index];
      answers.push(answer);
    }
  }

  shuffle(answers);

  const correctAnswer = answers.indexOf(capital);
  return { question, answers, correctAnswer, id: countryName };
};

export const generateRandomFlagsQuestion: (countries: Country[]) => Question = (
  countries
) => {
  const countryIndex = getRandomInt(countries.length);
  const { name: countryName, flag } = countries[countryIndex];

  const question = "What country does this flag belong to?";
  const answers: string[] = [countryName];
  const answersIndexcountries: number[] = [countryIndex];

  while (answers.length !== ANSWERS_NUMBER) {
    const index = getRandomInt(countries.length);

    if (!answersIndexcountries.includes(index)) {
      answersIndexcountries.push(index);
      const { name: answer } = countries[index];
      answers.push(answer);
    }
  }

  shuffle(answers);
  const correctAnswer = answers.indexOf(countryName);
  return { question, answers, correctAnswer, id: countryName, img: flag };
};

export const generateRandomQuestion: (countries: Country[]) => Question = (
  countries
) => {
  const questionType = getRandomInt(2);
  switch (questionType) {
    case 0:
      return generateRandomFlagsQuestion(countries);
    default:
      return generateRandomCapitalQuestion(countries);
  }
};
