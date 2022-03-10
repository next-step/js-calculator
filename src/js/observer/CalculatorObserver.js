export default class CalculatorObserver {
  constructor(totalPadComponent) {
    this.totalPadComponent = totalPadComponent;
  }

  update(model) {
    this.totalPadComponent.updateText({
      display: model.totalInputToString || 0,
    });
  }
}
