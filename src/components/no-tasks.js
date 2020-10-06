import {createElement} from './../utils/render.js';

const createNoTaskListComponent = () => {
  return (
    `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`
  );
};

export class NoTaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTaskListComponent();
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
