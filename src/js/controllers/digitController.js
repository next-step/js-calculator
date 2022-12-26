import { calculationResultStore } from "../store/caculationResultStore.js";

import { digitViews } from "../views/digitViews.js";
import { totalView } from "../views/totalView.js";

digitViews.forEach((digitView) => {
  digitView.onClick((e) => {
    const buttonNumber = e.target.textContent;
    const newCurrentNumber = Number(String(calculationResultStore.currentNumber) + buttonNumber);

    calculationResultStore.currentNumber = newCurrentNumber;
    totalView.appendTextContent(newCurrentNumber);
  });
});
