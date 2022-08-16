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
  countries: Country[],
  answersNumber: number
) => Question = (countries, answersNumber) => {
  const countryIndex = getValidCountryIndex(countries);

  const { name: countryName, capital } = countries[countryIndex];

  const question = `What is the capital of country ${countryName}?`;
  const answers: string[] = [capital];
  const answersIndexcountries: number[] = [countryIndex];

  while (answers.length !== answersNumber) {
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

export const generateRandomFlagsQuestion: (
  countries: Country[],
  answersNumber: number
) => Question = (countries, answersNumber) => {
  const countryIndex = getRandomInt(countries.length);
  const { name: countryName, flag } = countries[countryIndex];

  const question = "What country does this flag belong to?";
  const answers: string[] = [countryName];
  const answersIndexcountries: number[] = [countryIndex];

  while (answers.length !== answersNumber) {
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

const TOPICS: Record<
  string,
  (countries: Country[], answersNumber: number) => Question
> = {
  Flags: generateRandomFlagsQuestion,
  Capitals: generateRandomCapitalQuestion,
};

export const generateRandomQuestion: (
  countries: Country[],
  answersNumber: number,
  topics: string[]
) => Question = (countries, answersNumber, topics) => {
  const index = getRandomInt(topics.length);
  const topic = topics[index];
  return TOPICS[topic](countries, answersNumber);
};
