const initialState = {
  recordDefs: {
    byId: {
      // id: "IR",
      // name: "医療機関情報レコード",
      // columns: [
      //   {
      //     name: "レコード識別情報",
      //     type: "英数",
      //     maxBytes: 2,
      //     isFixed: true
      //   }
      // ]
    },
    allIds: []
  }
};

const master = (state = initialState, action) => {
  switch (action.type) {
    case "SET_RECORD_DEFS":
      return {
        ...state,
        recordDefs: {
          byId: action.payload.byId,
          allIds: action.payload.allIds
        }
      };
    case "CLEAR_MASTER":
      return initialState;
    default:
      return state;
  }
};

export default master;
