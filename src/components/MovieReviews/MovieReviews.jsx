import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../Fetch/fetch";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      if (movieId) {
        try {
          setReviews([]);
          setError(false);
          const data = await fetchReviews(movieId);
          setReviews(data.data.results);
        } catch (error) {
          setError(true);
        }
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <>
      {!error ? (
        reviews.length !== 0 ? (
          <ul className={css.list}>
            {reviews.map((item) => (
              <li key={item.id}>
                <h4 className={css.name}>
                  {item?.author_details?.name ||
                    item?.author_details?.username ||
                    "Author"}
                </h4>
                <p>{item?.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet</p>
        )
      ) : (
        <p>ooops</p>
      )}
    </>
  );
}
