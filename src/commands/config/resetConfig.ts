import {store} from "@src/services/store.js";

export const resetConfig = () => {
  store.clear();
  console.log("config cleared!")
}
