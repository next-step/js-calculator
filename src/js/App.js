import KeypadEvent from "./Event/KeypadEvent.js";

const App = (function() {
  const keypadBtn = document.querySelectorAll('button');
  
  [...keypadBtn].map((target) => {
    new KeypadEvent(target, 'click')
  })
})()

export default App;
