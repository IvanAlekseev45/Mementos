import type { CreatePhoto } from "../../types/memories";
import css from "./AddMamoryForm.module.css";

interface AddMamoryFormProps {
  onSubmit: (q: CreatePhoto) => void;
  closeModal: () => void;
}

const AddMamoryForm = ({ onSubmit, closeModal }: AddMamoryFormProps) => {
  const onFormSubmit = (formData: FormData) => {
    const data = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      image: formData.get("image") as string,
    };
    onSubmit(data);
    closeModal();
  };
  return (
    <div className={css["backdrop"]}>
      <div className={css["modal"]}>
        <h1 className={css["form-title"]}>Add your Memory..</h1>
        <form className={css["add-mamory-form"]} action={onFormSubmit}>
          <input type="text" placeholder="title.." name="title" />
          <input type="text" placeholder="date.." name="date" />

          <input type="text" placeholder="location.." name="location" />
          <input type="text" placeholder="add photo's URL.." name="image" />
          <textarea placeholder="description.." name="description" />
          <div className={css["form-btns"]}>
            <button type="submit" className={css["new-memory-btn"]}>
              New memory
            </button>
            <button type="button" className={css["later-btn"]} onClick={closeModal}>
              Later..
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMamoryForm;
