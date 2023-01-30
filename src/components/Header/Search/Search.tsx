import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import NewsContext from '../../../context/NewsContext';
import { Spinner } from '../../Commons';

export function Search() {
  const { handleSearchNews, currentPage } = useContext(NewsContext);

  return (
    <Formik
      initialValues={{
        searchTerm: '',
      }}
      onSubmit={async (values) => {
        await handleSearchNews(values.searchTerm, currentPage);
      }}
    >
      {({ isSubmitting }) => (
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
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : 'Search'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
