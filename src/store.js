import { compose, createStore } from "redux";

import rootReducer from "./rootReducer";

export default function createFinalStore() {
  const finalCreateStore = compose()(createStore);
  return finalCreateStore(rootReducer);
}
