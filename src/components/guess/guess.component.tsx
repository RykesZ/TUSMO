import React, { useState } from "react";

interface Props {
  onGuess: (guess: string) => void;
}

const Guess: React.FC<Props> = ({ onGuess }) => {
  const [guess, setGuess] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onGuess(guess);
    setGuess("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="guess">Proposez un mot :</label>
        <input
          type="text"
          id="guess"
          value={guess}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Guess;