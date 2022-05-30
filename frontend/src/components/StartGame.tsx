import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const StartGame = () => {
  const [name, setName] = useState("");
  return (
    <Flex
      direction="column"
      py="30px"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      fontFamily="Montserrat"
    >
      <Box textAlign="center">
        <Text fontSize="40px">Welcome to hangman!</Text>
        <Text>Choose your name and click start to play.</Text>
        <Input
          placeholder="name"
          w="300px"
          my="50px"
          onChange={(name) => setName(name.target.value)}
        />
        <Box>
          <Button
            as={Link}
            to={{
              pathname: name ? "/game" : "#",
              search: `?name=${name}`,
            }}
            colorScheme="green"
            w="200px"
            fontSize="16px"
            disabled={!name && true}
          >
            START
          </Button>
        </Box>
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
