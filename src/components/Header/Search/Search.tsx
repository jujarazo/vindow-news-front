import { Field, Form, Formik } from 'formik';
import { Spinner } from '../../Commons';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function Search() {
  return (
    <Formik
      initialValues={{
        searchTerm: '',
      }}
      onSubmit={async (values) => {
        await sleep(500);
        console.log(values);
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
