import columns from "./reducers/columns";
import { combineReducers } from "redux";
import file from "./reducers/file";
import form from "./reducers/form";
import master from "./reducers/master";
import rawdata from "./reducers/rawdata";
import records from "./reducers/records";
import rezepts from "./reducers/rezepts";
import seikyusho from "./reducers/seikyusho";

const rootReducer = combineReducers({
  rawdata,
  master,
  seikyusho,
  rezepts,
  records,
  columns,
  file,
  form
});

export default rootReducer;
