import DataSet from "../constants/DataSet.js";
import Component from "../core/Component.js";

export default class NumberPad extends Component {
  template() {
    return Object.keys(new Array(10).fill(""))
      .reverse()
      .map(
        (num) =>
          `<button class="digit" data-type="${DataSet.number}" data-test-number="${num}">${num}</button>`
      )
      .join("");
  }
}
