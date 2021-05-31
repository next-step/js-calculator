import { UI_COMPONENT } from '../../comm/constants.js';
export class Display {
    constructor() {
        this.$display = UI_COMPONENT.$display;
    }
    render(data) {
        this.$display.innerHTML = data.toString();
    }
}
