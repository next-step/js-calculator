import Component from "../core/Component.js";
import DataSet from "../constants/DataSet.js";
import Expression from "../constants/Expression.js";

export default class ExpressionPad extends Component {
  template() {
    return Object.values(Expression)
      .map(
        (exp) =>
          `<button class="operation" data-type="${DataSet.expression}">${exp}</button>`
      )
      .join("");
  }
}
