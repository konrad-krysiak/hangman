import { useEffect, useState } from "react";
import { Player } from "../types/Player";

// const SERVER_URL = "https://61e5-195-150-224-39.eu.ngrok.io";
const SERVER_URL = "http://localhost:3000";

export const playersFetcher = () =>
  fetch(SERVER_URL + "/player")
    .then((response) => response.json())
    .then((data) => data as Promise<Player[]>);

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await playersFetcher();
        setPlayers(response);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    data: players,
    isLoading: loading,
    isError: error,
  };
};
