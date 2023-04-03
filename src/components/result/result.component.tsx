import React from "react";
import { compareWords } from "../utils/wordUtils";

interface Props {
  targetWord: string;
  guess: string;
}

const Result: React.FC<Props> = ({ targetWord, guess }) => {
  const result = compareWords(targetWord, guess);

  return (
    <div>
      <h2>Résultat</h2>
      <p>{result}</p>
    </div>
  );
};

export default Result;