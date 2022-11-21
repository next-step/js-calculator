import contains from "../utils/contains.js";

class Modifier {
  setEvent({ setTotalValue }) {
    const $modifier = contains(".modifier", "AC")[0];
    $modifier.addEventListener("click", () => {
      setTotalValue("0");
    });
  }

  render({ $parent }) {
    $parent.insertAdjacentHTML(
      "beforeend",
      `<div class="modifiers subgrid">
        <button class="modifier">AC</button>
      </div>`
    );
  }
}

export default Modifier;
