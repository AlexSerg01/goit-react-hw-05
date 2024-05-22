import { useEffect, useState } from "react";
import { Outlet, useParams, useLocation, Link } from "react-router-dom";
import { fetchById } from "../../Fetch/fetch";
import Header from "../../components/Header/Header";
import css from "./MovieDetailsPage.module.css";

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const goBack = location.state ?? "/movies";

  useEffect(() => {
    async function getInfo() {
      if (movieId) {
        try {
          setLoading(true);
          setError(false);
          const data = await fetchById(movieId);
          setInfo(data.data);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    }
    getInfo();
  }, [movieId]);

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>Oops, something went wrong...</p>;
  if (!info) return null;

  const imgPath = info?.backdrop_path;
  const imgUrl = `https://image.tmdb.org/t/p/w300${imgPath}`;
  const popularity = (info.vote_average / 10) * 100;

  return (
    <div className={css.container}>
      <Header />
      <Link className={css.backBtn} to={goBack}>
        Go back
      </Link>
      <div className={css.info_page}>
        <img src={imgUrl} className={css.info_page_img} />
        <div className={css.info}>
          <h2 className={css.film_title}>{info.title}</h2>
          <p className={css.p_score}>User Score: {popularity}%</p>
          <h3 className={css.sub_title}>Overview</h3>
          <p className={css.p}>{info.overview}</p>
          <h3 className={css.sub_title}>Genres</h3>
          <ul className={css.geners_ul}>
            {info.genres.map((el) => (
              <li key={el.id} className={css.geners_li}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
