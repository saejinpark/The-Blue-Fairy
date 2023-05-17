import { createRouter } from "../core/createRouter";
import Home from "./Home";
import New from "./New";
import View from "./View";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/new", component: New },
  { path: "#/view", component: View },
]);
