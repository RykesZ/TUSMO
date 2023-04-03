import React from "react";

interface Props {
  word: string;
}

const Word: React.FC<Props> = ({ word }) => {
  const firstLetter = word.charAt(0);
  const hiddenLetters = "_".repeat(word.length - 1);

  return (
    <div>
      <h2>Le mot à deviner :</h2>
      <p>{firstLetter + hiddenLetters}</p>
    </div>
  );
};

export default Word;