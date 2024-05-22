import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { fetchTrends } from "../../Fetch/fetch";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrend() {
      try {
        setError(false);
        setTrends([]);
        const data = await fetchTrends();
        setTrends(data.data.results);
      } catch {
        setError(true);
      }
    }
    getTrend();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.page_title}>Trending today</h1>
      {!error ? <MovieList data={trends} /> : <p>oops</p>}
    </div>
  );
}
