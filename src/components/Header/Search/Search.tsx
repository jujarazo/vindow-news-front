import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import NewsContext from '../../../context/NewsContext';
import { Spinner } from '../../Commons';

export function Search() {
  const { isLoadingNews, handleSearchNews } = useContext(NewsContext);

  return (
    <Formik
      initialValues={{
        searchTerm: '',
      }}
      onSubmit={async (values) => {
        await handleSearchNews(values.searchTerm, 1);
      }}
    >
      <Form className="d-flex">
        <Field
          className="form-control"
          name="searchTerm"
          placeholder="News search..."
          type="text"
        />
        <button
          type="submit"
          className="btn btn-primary ms-3"
          disabled={isLoadingNews}
        >
          {isLoadingNews ? <Spinner /> : 'Search'}
        </button>
      </Form>
    </Formik>
  );
}
