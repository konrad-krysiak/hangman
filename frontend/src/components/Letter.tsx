import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  letter: string;
  word: string;
  checkLetter: (letter: string) => void;
}

export const Letter = ({ letter, word, checkLetter }: Props) => {
  const [used, setUsed] = useState(false);
  // console.log(word);
  // console.log(letter);

  return (
    <Button
      colorScheme={
        used
          ? word?.split("").includes(letter.toLocaleLowerCase())
            ? "yellow"
            : "red"
          : "green"
      }
      pointerEvents={used ? "none" : "auto"}
      w="20%"
      onClick={() => {
        setUsed(true);
        checkLetter(letter.toLocaleLowerCase());
      }}
    >
      {letter}
    </Button>
  );
};
