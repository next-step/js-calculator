export default function Calculator() {
  // digits panel function
  this.digitsPanelHandler = (event) => {
    const { target } = event;

    // 마우스를 끌어서 클릭할 때
    if (!target.classList.contains('digit')) {
      return;
    }

    console.log(target);
  };

  // operations panel function
  this.operationsPanelHandler = (event) => {
    const { target } = event;

    // 마우스를 끌어서 클릭할 때
    if (!target.classList.contains('operation')) {
      return;
    }

    console.log(target);
  };

  // AC(reset) panel function
  this.modifierPanelHandler = () => {
    console.log('초기화');
  };

  // total display get / set function
  this.getTotal = () => this.$totalDisplay.textContent;
  this.setTotal = (total) => {
    this.$totalDisplay.textContent = `${total}`;
  };
}
