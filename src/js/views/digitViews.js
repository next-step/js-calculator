import { View } from "./View.js";

const $digits = document.getElementById('digits');
const digitViews = Array.from($digits.children).map(($digit) => new View($digit));

export { digitViews };
