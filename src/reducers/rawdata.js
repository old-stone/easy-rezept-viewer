const initialState = {
  text: "",
  array: [],
  errors: []
};

const rawdata = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_RAWDATA":
      return {
        text: action.text,
        array: action.array,
        errors: action.errors
      };
    default:
      return state;
  }
};

export default rawdata;
