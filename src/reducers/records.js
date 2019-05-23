const initialState = {
  byId: {
    // 0: {
    //   id: 0,
    //   recordShikibetsuInfo: "IR",
    //   columns: [0, 1, 2],
    // }
  },
  allIds: []
};

const records = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_RECORDS":
      return {
        byId: action.payload.byId,
        allIds: action.payload.allIds
      };
    case "CLEAR_RECORDS":
      return initialState;
    default:
      return state;
  }
};

export default records;
