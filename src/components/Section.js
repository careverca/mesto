
export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(item, pos) {
        pos === 'top'
            ? this._container.prepend(item)
            : this._container.append(item);
    }
}