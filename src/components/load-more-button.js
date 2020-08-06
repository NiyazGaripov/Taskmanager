import {createElement} from './../utils/render.js';

const createLoadMoreButtonComponent = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreButtonComponent();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
