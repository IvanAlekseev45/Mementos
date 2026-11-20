import { ErrorMessage, Field, Form, Formik, type FormikHelpers, type FormikProps } from "formik";
import type { CreatePhoto } from "../../types/memories";
import css from "./AddMamoryForm.module.css";
import * as Yup from "yup";
import { useEffectsForModal } from "../../hooks/modalEffects";
import axios from "axios";

interface AddMamoryFormProps {
  onSubmit: (q: CreatePhoto) => Promise<void>;
  closeModal: () => void;
}

interface InitialValuesTypes {
  title: string;
  date: string;
  location: string;
  image: null | File;
  description: string;
}

const initialValues: InitialValuesTypes = {
  title: "",
  date: "",
  location: "",
  image: null,
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required().trim(),
  date: Yup.string().required().trim(),
  location: Yup.string().required().trim(),
  image: Yup.mixed<File>().required("Choose a photo"),
  description: Yup.string().required().trim(),
});

const AddMamoryForm = ({ onSubmit, closeModal }: AddMamoryFormProps) => {
  useEffectsForModal(closeModal);

  const onFormSubmit = async (values: InitialValuesTypes, helpers: FormikHelpers<InitialValuesTypes>) => {
    try {
      await onSubmit(values);

      closeModal();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 413) {
          helpers.setFieldError("image", "This photo is too big..");
        }
        console.log(err);
      }

      console.log(err);
    }
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

            console.log("\n========== DEBUG ==========");
            console.log(data.errors);
            console.log("===========================\n");

            return (
              <Form className={css["add-mamory-form"]}>
                <Field type="text" placeholder="title.." name="title" />
                <Field type="date" placeholder="date.." name="date" />
                <Field type="text" placeholder="location.." name="location" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] ?? null;

                    data.setFieldValue("image", file);
                  }}
                />
                <ErrorMessage component={"span"} name="image" className={css["error-message-url"]} />
                <Field as="textarea" placeholder="description.." name="description" />
                <div className={css["form-btns"]}>
                  <button type="submit" className={css["new-memory-btn"]}>
                    {data.isSubmitting ? "Creating memory..." : "New memory"}
                  </button>
                  <button type="button" className={css["later-btn"]} onClick={closeModal}>
                    Later..
                  </button>
                  {myFormErrors.length > 0 && !myFormErrors.includes("image") && (
                    <span className={css["error-message"]}>Don't leave empty spaces in your memory..</span>
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
