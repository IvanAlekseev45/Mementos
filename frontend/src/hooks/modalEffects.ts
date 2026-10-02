import { useEffect } from "react";

export const useEffectsForModal = (closeModal: () => void) => {
  const keyBourdHandler = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      closeModal();
    }
    return;
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", keyBourdHandler);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", keyBourdHandler);
    };
  }, [closeModal]);
};
