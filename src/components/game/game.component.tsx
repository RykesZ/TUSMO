import React, { useState } from "react";
import Word from "./Word";
import Guess from "./Guess";
import Result from "./Result";
import Words from "../../services/words.service";

type Props = {};

const Game: React.FC<Props> = () => {
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guess, setGuess] = useState<string>("");

  const handleNewGame = async () => {
    // Récupérer un nouveau mot à deviner et le stocker dans l'état local
    const newWord = await Words.getNewWord;
    setWordToGuess(newWord);

    // Réinitialiser la proposition du joueur
    setGuess("");
  };

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Comparer la proposition du joueur avec le mot à deviner
    const result = Words.compareWords(wordToGuess, guess);

    // Afficher le résultat de la comparaison
    console.log(result);
  };

  return (
    <div>
      <h1>Motus</h1>
      <button onClick={handleNewGame}>Nouvelle partie</button>
      <Word word={wordToGuess} />
      <Guess guess={guess} onGuessChange={setGuess} onSubmit={handleGuessSubmit} />
      <Result wordToGuess={wordToGuess} guess={guess} />
    </div>
  );
};

export default Game;