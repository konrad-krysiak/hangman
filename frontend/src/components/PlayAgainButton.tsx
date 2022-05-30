import { Button } from "@chakra-ui/react";
import { createSearchParams, useNavigate } from "react-router-dom";

export const PlayAgainButton = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      w="200px"
      colorScheme="green"
      onClick={() =>
        navigate({
          pathname: "/game",
          search: `?${createSearchParams({ name })}`,
        })
      }
    >
      PLAY AGAIN
    </Button>
  );
};
