import { mergeState } from './lib.js';

function render(dom, state = ['0']) {
  dom.innerHTML = mergeState(state.join(''));
}

export default render;
