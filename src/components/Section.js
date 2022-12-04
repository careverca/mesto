export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(item, pos) {
        pos === 'top'
            ? this._container.prepend(item)
            : this._container.append(item);
    }
}