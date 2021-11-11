import DataSet from "../constants/DataSet.js";
import Component from "../core/Component.js";

export default class NumberPad extends Component {
  template() {
    return `
        <button class="digit" data-type="${DataSet.number}">9</button>
        <button class="digit" data-type="${DataSet.number}">8</button>
        <button class="digit" data-type="${DataSet.number}">7</button>
        <button class="digit" data-type="${DataSet.number}">6</button>
        <button class="digit" data-type="${DataSet.number}">5</button>
        <button class="digit" data-type="${DataSet.number}">4</button>
        <button class="digit" data-type="${DataSet.number}">3</button>
        <button class="digit" data-type="${DataSet.number}">2</button>
        <button class="digit" data-type="${DataSet.number}">1</button>
        <button class="digit" data-type="${DataSet.number}">0</button>
    `;
  }
}
