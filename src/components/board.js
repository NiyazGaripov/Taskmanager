import {AbstractComponent} from "./abstract-component";

const createBoardComponent = () => {
  return (
    `<section class="board container"></section>`
  );
};

export class Board extends AbstractComponent {
  getTemplate() {
    return createBoardComponent();
  }
}
