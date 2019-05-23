const initialState = {
  byId: {
    // id: 0,
    // recordShikibetsuInfo: "IR",
    // value: "",
    // error: ""
  },
  allIds: []
};

const columns = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COLUMNS":
      return {
        byId: action.payload.byId,
        allIds: action.payload.allIds
      };
    case "CHANGE_VALUE":
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            value: action.payload.value,
            error: action.payload.error
          }
        }
      };
    case "CLEAR_COLUMNS":
      return initialState;
    default:
      return state;
  }
};

export default columns;
