import { View } from "./View.js";

const $operations = document.getElementById('operations');
const operationViews = Array.from($operations.children).map(($operation) => new View($operation));

export { operationViews };
