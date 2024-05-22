import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    language: "en-US",
  },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWM0OWY5NjcyZjg2YjdjNDJjNWJkMWJjMjkyZDBmNSIsInN1YiI6IjY2NGI3NWI0YTgyMzQ1ZjhlMGVkNDA0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PamA8SAC3C5h23zfBB0rynZYjUQujgbVYaSbJPZJFAA",
  },
});

export async function fetchTrends() {
  const url = "trending/movie/day";

  return await axios.get(url);
}

export async function fetchById(movie_id) {
  const url = `movie/${movie_id}`;

  return await axios.get(url);
}

export async function fetchByQuery(query) {
  const url = `search/movie`;
  const params = {
    query: query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  };
  const response = await axios.get(url, { params });
  return response.data;
}

export async function fetchActors(id) {
  const url = `movie/${id}/credits`;
  return await axios.get(url);
}

export async function fetchReviews(id) {
  const url = `movie/${id}/reviews`;

  return await axios.get(url);
}
