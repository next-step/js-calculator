import { initStore, getCurrentNumber } from "../store/calculatorStore.js";

import { modifierView } from "../views/modifierView.js";
import { totalView } from "../views/totalView.js";

modifierView.onClick((e) => {
  initStore();
  totalView.appendTextContent(getCurrentNumber());
});
