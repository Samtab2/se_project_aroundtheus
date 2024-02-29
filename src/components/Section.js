export default class Section {
  constructor({ items, renderer }, containerElement) {
    this._renderer = renderer;
    this._container = document.querySelector(containerElement);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItem(element) {
    this._items = element;
  }
}
