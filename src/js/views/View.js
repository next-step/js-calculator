// interface 통일을 위한 View class
export class View {
  rootElement = null;
  #keyPressEventHandlers = null;
  #keyPressEventListener = null;

  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  #validateSelector(selector) {
    if (selector && typeof selector !== 'string') throw new Error('event selector only can be string');

    return true;
  }

  #getTargetElementWithSelector(selector) {
    return selector ? this.rootElement.querySelector(selector) : this.rootElement;
  }

  #addEventListener(eventType, eventListener, selector) {
    const targetElement = this.#getTargetElementWithSelector(selector);
    targetElement.addEventListener(eventType, eventListener);
  }

  #removeEventListener(eventType, eventListener, selector) {
    const targetElement = this.#getTargetElementWithSelector(selector);
    targetElement.removeEventListener(eventType, eventListener);
  }

  onClick(onClickEventListener, selector) {
    this.#validateSelector(selector);

    this.#addEventListener('click', onClickEventListener, selector);
  }

  #pushOnKeyPressHandler(keyPressHandler) {
    if (!this.#keyPressEventHandlers) {
      this.#keyPressEventHandlers = [keyPressHandler];
    } else {
      this.#keyPressEventHandlers.push(keyPressHandler);
    }
  }

  #createKeyPressEventListener(keyPressHandlers) {
    return (e) => {
      const pressedKey = e.key;
      const pressedKeyHandler = keyPressHandlers.find(({ key }) => pressedKey === key);

      pressedKeyHandler?.(e);
    }
  }

  addKeyPressEventHandler(key, keyPressEventHandler) {
    const KEY_PRESS = 'keypress';
    const newKeyPressEventHandler = { key, keyPressEventHandler };

    this.#removeEventListener(KEY_PRESS, this.#keyPressEventListener);

    this.#pushOnKeyPressHandler(newKeyPressEventHandler);
    this.#keyPressEventListener = this.#createKeyPressEventListener(this.#keyPressEventHandlers);
    this.#addEventListener(KEY_PRESS, this.#keyPressEventListener);
  }

  appendTextContent(textContent, selector) {
    const targetElement = this.#getTargetElementWithSelector(selector);
    targetElement.textContent = textContent;
  }
}
