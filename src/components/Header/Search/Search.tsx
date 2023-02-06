import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useContext } from 'react';
import NewsContext from '../../../context/NewsContext';
import { Spinner } from '../../Commons';

type searchValues = {
  searchTerm: string;
};

export function Search() {
  const { isLoadingNews, handleSearchNews } = useContext(NewsContext);

  const searchValidation = (values: searchValues) => {
    const errors: Partial<searchValues> = {};

    if (!values.searchTerm || values.searchTerm.length < 3) {
      errors.searchTerm = 'The term you must be at least 3 characters long';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        searchTerm: '',
      }}
      onSubmit={async (values) => {
        await handleSearchNews(values.searchTerm, 1);
      }}
      validate={searchValidation}
    >
      <Form>
        <div className="d-flex">
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
        </div>
        <ErrorMessage
          className="text-danger"
          name="searchTerm"
          component="div"
        />
      </Form>
    </Formik>
  );
}
