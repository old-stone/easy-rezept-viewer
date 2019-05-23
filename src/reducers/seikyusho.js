const initialState = {
  headerId: null,
  footerId: null,
  extention: "",
  isActive: false,
  selectedId: null
};

const seikyusho = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SEIKYUSHO":
      return {
        headerId: action.payload.headerId,
        footerId: action.payload.footerId,
        extention: action.payload.extention,
        isActive: action.payload.isActive,
        selectedId: action.payload.selectedId
      };
    case "SELECT_RECORD":
      return {
        ...state,
        selectedId: action.payload.selectedId
      };
    case "CLEAR_SEIKYUSHO":
      return initialState;
    default:
      return state;
  }
};

export default seikyusho;
