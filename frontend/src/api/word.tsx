import { useEffect, useState } from "react";
import { Word } from "../types/Word";

const SERVER_URL = "http://localhost:3000";

export const wordFetcher = () =>
  fetch(SERVER_URL + "/word/random")
    .then((response) => response.json())
    .then((data) => data as Promise<Word>);

export const useRandomWord = () => {
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await wordFetcher();
        setWord(response);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    data: word,
    isLoading: loading,
    isError: error,
  };
};
