class Event {
  constructor(target, type) {
    this.tag = document.querySelector(target)
    this.tag.addEventListener(type, this.handleEvent)
  }

  handleEvent() {

  }
};

export default Event;