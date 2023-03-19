import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { usePlayers } from "../api/players";

export const Leaderboard = () => {
  const { data, isLoading, isError } = usePlayers();

  console.log(isLoading);
  console.log(data);

  if (isError) {
    return <Box>Something went wrong...</Box>;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box minH="100vh" py="20px" bg="green.200" fontFamily="Montserrat">
      <Heading textAlign="center">LEADERBOARD</Heading>
      {isLoading ? (
        <Box textAlign="center" py="50px" fontSize="30px">
          Loading...
        </Box>
      ) : (
        <TableContainer px="100px" mt="50px">
          <Table>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>name</Th>
                <Th>chances left</Th>
                <Th>games played</Th>
                <Th>Ratio</Th>
              </Tr>
            </Thead>
            <Tbody fontSize="16px">
              {data
                .sort((a, b) => {
                  const proportion_a = +a.chancesLeft / +a.games;
                  const proportion_b = +b.chancesLeft / +b.games;
                  if (proportion_a > proportion_b) {
                    return -1;
                  } else if (proportion_a === proportion_b) {
                    return 0;
                  } else {
                    return 1;
                  }
                })
                .map((player, idx) => (
                  <Tr>
                    <Td>{idx + 1}</Td>
                    <Td>{player.name}</Td>
                    <Td>{player.chancesLeft.toString()}</Td>
                    <Td>{player.games.toString()}</Td>
                    <Td>{(+player.chancesLeft / +player.games).toFixed(2)}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Box textAlign="center" mt="50px">
        <Button as={Link} to="/" colorScheme="red" w="200px">
          GO BACK
        </Button>
      </Box>
    </Box>
  );
};
