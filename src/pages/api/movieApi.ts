import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://moviesdatabase.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": NEXT_PUBLIC_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": NEXT_PUBLIC_X_RAPIDAPI_HOST,
  },
});
