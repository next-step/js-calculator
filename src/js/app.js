import Display from "./component/Display.js";
import Input from "./component/Input.js";
import { $ } from "./utils/selectors.js";

export default function App(store) {
  const input = new Input(store, $(".calculator"));
  const display = new Display(store, $("#total"));
  store.addObserver(input, display);
}
