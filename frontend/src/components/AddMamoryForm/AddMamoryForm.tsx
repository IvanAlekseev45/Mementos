import { ErrorMessage, Field, Form, Formik, type FormikProps } from "formik";
import type { CreatePhoto } from "../../types/memories";
import css from "./AddMamoryForm.module.css";
import * as Yup from "yup";
import { useEffectsForModal } from "../../hooks/modalEffects";

interface AddMamoryFormProps {
  onSubmit: (q: CreatePhoto) => void;
  closeModal: () => void;
}

interface InitialValuesTypes {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

const initialValues = {
  title: "",
  date: "",
  location: "",
  image: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required().trim(),
  date: Yup.string().required().trim(),
  location: Yup.string().required().trim(),
  image: Yup.string().required("").trim("").url("invalid url format"),
  description: Yup.string().required().trim(),
});

const AddMamoryForm = ({ onSubmit, closeModal }: AddMamoryFormProps) => {
  useEffectsForModal(closeModal);

  const onFormSubmit = (values: InitialValuesTypes) => {
    onSubmit(values);

    closeModal();
  };
  return (
    <div className={css["backdrop"]}>
      <div className={css["modal"]}>
        <h1 className={css["form-title"]}>Add your Memory..</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(data: FormikProps<InitialValuesTypes>) => {
            const myFormErrors = Object.keys(data.errors);

            return (
              <Form className={css["add-mamory-form"]}>
                <Field type="text" placeholder="title.." name="title" />
                <Field type="date" placeholder="date.." name="date" />
                <Field type="text" placeholder="location.." name="location" />
                <Field type="text" placeholder="add photo's URL.." name="image" />
                <ErrorMessage
                  component={"span"}
                  name="image"
                  className={css["error-message-url"]}
                />
                <Field as="textarea" placeholder="description.." name="description" />
                <div className={css["form-btns"]}>
                  <button type="submit" className={css["new-memory-btn"]}>
                    New memory
                  </button>
                  <button type="button" className={css["later-btn"]} onClick={closeModal}>
                    Later..
                  </button>
                  {myFormErrors.length > 0 && (
                    <span className={css["error-message"]}>
                      Don't leave empty spaces in your memory..
                    </span>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddMamoryForm;
