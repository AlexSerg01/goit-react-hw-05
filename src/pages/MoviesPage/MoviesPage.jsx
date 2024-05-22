import { Formik, Form, Field } from "formik";
import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { fetchByQuery } from "../../Fetch/fetch";
import MovieList from "../../components/MovieList/MovieList";
import { Outlet, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mainParam = searchParams.get("qwery");
  const [keyWord, setKeyWord] = useState(() => mainParam || "");
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  function submitHandler(data) {
    const searchValue = data.search.trim();
    setKeyWord(searchValue);
    setSearchParams({ qwery: searchValue });
  }

  useEffect(() => {
    if (!keyWord) return; // Додаємо перевірку на порожнє ключове слово

    async function getInfo() {
      try {
        setError(false);
        setFilms([]);
        const data = await fetchByQuery(keyWord);
        setFilms(data.results || []); // Додаємо перевірку на наявність results
      } catch (error) {
        setError(true);
      }
    }
    getInfo();
  }, [keyWord]);

  const initialValues = { search: mainParam || "" };

  return (
    <>
      <div>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          <Form className={css.search}>
            <Field
              className={css.field}
              name="search"
              placeholder="Enter here..."
              autoComplete="off"
            ></Field>
            <button className={css.btn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
      {!error && <MovieList data={films}></MovieList>}
      {error && <p>Something went wrong. Please try again later.</p>}
      <Outlet />
    </>
  );
}
