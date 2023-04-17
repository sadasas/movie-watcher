import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://moviesdatabase.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "bcf62e5e45msh2eee34009386b14p199dc3jsn52392703a308",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
});
