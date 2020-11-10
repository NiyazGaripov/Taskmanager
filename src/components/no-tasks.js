import {AbstractComponent} from "./abstract-component";

const createNoTaskListComponent = () => {
  return (
    `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`
  );
};

export class NoTaskList extends AbstractComponent {
  getTemplate() {
    return createNoTaskListComponent();
  }
}
