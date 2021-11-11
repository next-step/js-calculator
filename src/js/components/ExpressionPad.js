import Component from "../core/Component.js";

export default class ExpressionPad extends Component {
  template() {
    return `
        <button class="operation">/</button>
        <button class="operation">X</button>
        <button class="operation">-</button>
        <button class="operation">+</button>
        <button class="operation">=</button>
    `;
  }
}
