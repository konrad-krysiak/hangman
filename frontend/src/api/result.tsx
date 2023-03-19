import { BACKEND_URI } from "../constants/server";

const SERVER_URL = `${BACKEND_URI}/player/result`;

export const addResult = async (name: string, chancesLeft: Number) => {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, chancesLeft }),
  });
  if (response.status === 500) {
    return "Error";
  }
  const data = await response.json();
  return data.success;
};
