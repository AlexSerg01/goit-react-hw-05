import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchActors } from "../../Fetch/fetch";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [fullCast, setFullCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      if (movieId) {
        try {
          setFullCast([]);
          setError(false);
          const data = await fetchActors(movieId);
          setFullCast(data.data.cast);
        } catch (error) {
          setError(true);
        }
      }
    }
    getCast();
  }, [movieId]);

  const defImg =
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png";

  return (
    <div className={css.container}>
      {!error ? (
        <ul className={css.castList}>
          {fullCast.map((item) => (
            <li key={item.id} className={css.castLi}>
              <img
                className={css.photo}
                src={
                  item?.profile_path
                    ? `https://image.tmdb.org/t/p/w200${item?.profile_path}`
                    : defImg
                }
                alt={item?.name}
                width="100"
              />
              <h4>{item.name}</h4>
              <p>as: {item?.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>ooops</p>
      )}
    </div>
  );
}
