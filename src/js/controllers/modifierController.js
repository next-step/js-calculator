import { calculationResultStore } from "../store/caculationResultStore.js";

import { modifierView } from "../views/modifierView.js";
import { totalView } from "../views/totalView.js";

modifierView.onClick((e) => {
  const INIT_NUMBER = 0;
  calculationResultStore.savedResult = INIT_NUMBER;
  calculationResultStore.currentNumber = INIT_NUMBER;
  totalView.appendTextContent(INIT_NUMBER);
});
