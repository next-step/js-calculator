import App from "./app.js";
import Store from "./store/index.js";
import { $ } from "./utils/selectors.js";

new App(new Store(), $(".calculator"));
