import Component from "../core/Component.js";
import DataSet from "../constants/DataSet.js";
import Expression from "../constants/Expression.js";

export default class ExpressionPad extends Component {
  template() {
    return `
        <button class="operation" data-type="${DataSet.expression}">${Expression.devide}</button>
        <button class="operation" data-type="${DataSet.expression}">${Expression.multiply}</button>
        <button class="operation" data-type="${DataSet.expression}">${Expression.minus}</button>
        <button class="operation" data-type="${DataSet.expression}">${Expression.plus}</button>
        <button class="operation" data-type="${DataSet.expression}">${Expression.calculate}</button>
    `;
  }
}
