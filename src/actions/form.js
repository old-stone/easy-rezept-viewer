export const openForm = () => {
  return {
    type: "OPEN_FORM",
    isOpen: true
  };
};

export const closeForm = () => {
  return {
    type: "CLOSE_FORM",
    isOpen: false
  };
};
