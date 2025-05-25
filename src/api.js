import axios from "axios";

const API_KEY = "285c3a7907bc924a56926f349bca1839";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchTrending = () =>
  tmdb.get("/trending/movie/week").then((res) => res.data.results);

export const fetchNowPlaying = () =>
  tmdb.get("/movie/now_playing").then((res) => res.data.results);

export const fetchTopRated = () =>
  tmdb.get("/movie/top_rated").then((res) => res.data.results);

export const fetchUpcoming = () =>
  tmdb.get("/movie/upcoming").then((res) => res.data.results);

export const searchMovies = (query) => {
  if (!query) return Promise.resolve([]);
  return tmdb
    .get("/search/movie", {
      params: {
        query,
        include_adult: false,
        page: 1,
      },
    })
    .then((res) => res.data.results);
};

export const fetchMovieDetail = (movieId) => {
  return tmdb.get(`/movie/${movieId}`).then((res) => res.data);
};
