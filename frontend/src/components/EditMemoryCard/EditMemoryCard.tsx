import { Field, Form, Formik, type FormikProps } from "formik";
import type { Memory, UpdateMemoryObj } from "../../types/memories";
import css from "./EditMemoryCard.module.css";
import Modal from "../Modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemory } from "../../services/memory";
import * as Yup from "yup";

interface EditMemoryCardProps {
  data?: Memory;
  onCloseModal: () => void;
}

const EditMemoryCard = ({ data, onCloseModal }: EditMemoryCardProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateMemory"],
    mutationFn: updateMemory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardById"],
      });

      onCloseModal();
    },
  });

  const initialValues: UpdateMemoryObj = {
    title: data?.title ?? "",
    date: data?.date ?? "",
    description: data?.description ?? "",
    location: data?.location ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required().trim(),
    date: Yup.string().required().trim(),
    location: Yup.string().required().trim(),
    description: Yup.string().required().trim(),
  });

  const changeMemoryHandler = (values: UpdateMemoryObj) => {
    mutate({
      id: data?._id,
      body: values,
    });
  };

  return (
    <Modal>
      <Formik
        initialValues={initialValues}
        onSubmit={changeMemoryHandler}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(data: FormikProps<UpdateMemoryObj>) => {
          const myFormErrors = Object.keys(data.errors);

          return (
            <Form className={css["edit-form"]}>
              <Field type="text" name="title" />

              <Field type="date" name="date" />

              <Field type="text" name="location" />

              <Field as="textarea" name="description" />

              <button type="submit" className={css["change-memory-btn"]} disabled={!data.dirty}>
                Change memory..
              </button>

              <button type="button" className={css["close-btn"]} onClick={onCloseModal}>
                Close
              </button>

              {myFormErrors.length > 0 && (
                <span className={css["error-message"]}>
                  Don't leave empty spaces in your memory..
                </span>
              )}
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditMemoryCard;
