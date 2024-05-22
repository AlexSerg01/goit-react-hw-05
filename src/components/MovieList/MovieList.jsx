import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ data }) {
  const location = useLocation();

  return (
    <ul className={css.film_ul}>
      {data.map((el) => (
        <li key={el.id} className={css.film_li}>
          <Link to={`/movies/${el.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w300${el?.backdrop_path}`}
              alt="poster"
              className={css.image}
              width="200"
              height="150"
            />
            <h2 className={css.title}>{el.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
