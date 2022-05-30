import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Letter } from "./Letter";
import { Alphabet } from "../constants/alphabet";
import { useRandomWord } from "../api/word";

export const Game = () => {
  const [chances, setChances] = useState(9);
  const [guessMatrix, setGuessMatrix] = useState<Array<boolean>>([]);
  const [imageNumber, setImageNumber] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useRandomWord();

  useEffect(() => {
    if (!isError && data) {
      setGuessMatrix(new Array(data.word.length).fill(false));
    }
  }, [data]);

  const checkLetter = (letter: string) => {
    const newGuessMatrix = guessMatrix.map((bool, idx) =>
      letter === data?.word[idx] ? true : bool
    );

    // Check if player wins
    if (newGuessMatrix.every((i) => i)) {
      navigate("/verdict", {
        state: {
          isWon: true,
          name: searchParams.get("name"),
          chancesLeft: chances,
        },
      });
    }

    // IF GOOD LETTER
    if (!_.isEqual(newGuessMatrix, guessMatrix)) {
      setGuessMatrix(newGuessMatrix);
    } else {
      // IF BAD LETTER
      setImageNumber((prevState) => prevState + 1);
      if (chances === 1) {
        navigate("/verdict", {
          state: { isWon: false, name: searchParams.get("name") },
        });
      } else {
        setChances((prevState) => prevState - 1);
      }
    }
  };

  if (isLoading) {
    return (
      <Flex
        h="100vh"
        fontSize="30px"
        fontFamily="Montserrat"
        justifyContent="center"
        alignItems="center"
      >
        Loading Game..
      </Flex>
    );
  }

  if (!data || isError) {
    return (
      <Flex
        h="100vh"
        fontSize="30px"
        fontFamily="Montserrat"
        justifyContent="center"
        alignItems="center"
      >
        Error has occoured!
      </Flex>
    );
  }

  return (
    <Flex
      fontFamily="Montserrat"
      textAlign="center"
      py="20px"
      justifyContent="center"
      direction="column"
    >
      <Box
        borderLeft="1px solid #e0e0e0"
        borderBottom="1px solid #e0e0e0"
        borderRight="1px solid #e0e0e0"
        p="10px"
      >
        <Box>TIP</Box>
        <Box fontSize="24px">{data.tip}</Box>
      </Box>

      <Box py="10px" fontSize="30px">
        {guessMatrix.map((bool, idx) => (
          <Text key={idx} display="inline-block" px="2px">
            {bool ? data.word[idx] : <BsQuestionSquareFill />}
          </Text>
        ))}
      </Box>

      <Flex mt="20px" w="100%">
        <Flex flex={1} justifyContent="center">
          <Image src={`/s${imageNumber}.jpg`} />
        </Flex>
        <Flex flex={1} wrap="wrap" gap="10px">
          {Alphabet.map((letter, idx) => (
            <Letter
              key={idx}
              letter={letter}
              word={data.word}
              checkLetter={checkLetter}
            />
          ))}
        </Flex>
      </Flex>
      <Box pt="50px">
        <Button colorScheme="red" w="200px" onClick={() => navigate("/")}>
          Resign
        </Button>
      </Box>
    </Flex>
  );
};
