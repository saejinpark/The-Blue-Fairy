import router from "./src/routes";
import App from "./src/components/App";

const root = document.querySelector("#root");
root.append(new App().el);

router();
