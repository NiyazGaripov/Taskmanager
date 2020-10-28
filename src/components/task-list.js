import {AbstractComponent} from "./abstract-component";

const createTaskListComponent = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export class TaskList extends AbstractComponent {
  getTemplate() {
    return createTaskListComponent();
  }
}
