const initialState = {
  byId: {
    // 0: {
    //   id: 0,
    //   records: [0, 1, 2],
    //   recordShikibetsuInfo: "IR",
    //   isOpen: false
    // }
  },
  allIds: []
};

const rezepts = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REZEPTS":
      return {
        byId: action.payload.byId,
        allIds: action.payload.allIds
      };
    case "SELECT_REZEPT":
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            isOpen: !state.byId[action.payload.id].isOpen
          }
        }
      };
    case "SELECT_ALL_REZEPT":
      const byId = {};
      for (const id in state.byId) {
        byId[id] = {
          ...state.byId[id],
          isOpen: action.payload.isOpen
        };
      }
      return {
        ...state,
        byId: byId
      };
    case "CLEAR_REZEPTS":
      return initialState;
    default:
      return state;
  }
};

export default rezepts;
