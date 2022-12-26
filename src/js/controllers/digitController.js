import { getCurrentNumber, appendNumberToCurrentNumber, setIsOperateState } from "../store/calculatorStore";

import { digitViews } from "../views/digitViews.js";
import { totalView } from "../views/totalView.js";

digitViews.forEach((digitView) => {
  digitView.onClick((e) => {
    const buttonNumber = e.target.textContent;

    appendNumberToCurrentNumber(buttonNumber);
    totalView.appendTextContent(getCurrentNumber());
    setIsOperateState();
  });
});
