import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { addResult } from "../api/result";
import { PlayAgainButton } from "./PlayAgainButton";

interface LocationState {
  isWon: boolean;
  name: string;
  chancesLeft?: number;
}

export const Verdict = () => {
  const location = useLocation();
  const { isWon, name, chancesLeft } = location.state as LocationState;

  useEffect(() => {
    addResult(name, chancesLeft || 0);
  }, []);

  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      fontFamily="Montserrat"
    >
      <Box textAlign="center">
        {isWon ? (
          <>
            <Text fontSize="30px">Congratulations {name}. You won!</Text>
            <Text fontSize="30px" mb="20px">
              Chances left: {chancesLeft}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="30px">Ohh! You lost {name}.</Text>
            <Text fontSize="30px" mb="20px">
              Try again!
            </Text>
          </>
        )}

        <PlayAgainButton name={name} />
        <Box mt="20px">
          <Button
            as={Link}
            to={{
              pathname: "/leaderboard",
            }}
            colorScheme="green"
            w="200px"
            fontSize="16px"
            textDecor="none"
          >
            LEADERBOARD
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
