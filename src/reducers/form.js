const initialState = {
  isOpen: false
};

const form = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_FORM":
      return {
        isOpen: true
      };
    case "CLOSE_FORM":
      return {
        isOpen: false
      };
    default:
      return state;
  }
};

export default form;
