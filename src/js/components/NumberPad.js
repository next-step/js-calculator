import Component from "../core/Component.js";

export default class NumberPad extends Component {
  template() {
    return `
        <button class="digit" data-number="9">9</button>
        <button class="digit">8</button>
        <button class="digit">7</button>
        <button class="digit">6</button>
        <button class="digit">5</button>
        <button class="digit">4</button>
        <button class="digit">3</button>
        <button class="digit">2</button>
        <button class="digit">1</button>
        <button class="digit">0</button>
    `;
  }
}
