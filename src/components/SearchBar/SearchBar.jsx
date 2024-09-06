import { Field, Form, Formik } from "formik";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
            name="query"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
