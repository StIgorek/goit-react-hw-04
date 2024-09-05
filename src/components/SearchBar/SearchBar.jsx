import { Field, Form, Formik } from "formik";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik initialValues={{ searchRequest: "" }} onSubmit={onSearch}>
        <Form className={css.form}>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
            name="searchRequest"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
