import { useEffect, useState } from "react";

import { Player } from "../types/Player";
import { BACKEND_URI } from "../constants/server";

export const playersFetcher = () =>
  fetch(BACKEND_URI + "/player")
    .then((response) => response.json())
    .then((data) => data as Promise<Player[]>);

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
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
