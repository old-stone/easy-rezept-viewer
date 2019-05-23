const initialState = {
  fileName: ""
};

const file = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILE_NAME":
      return {
        fileName: action.fileName
      };
    case "CLEAR_FILE":
      return initialState;
    default:
      return state;
  }
};

export default file;
