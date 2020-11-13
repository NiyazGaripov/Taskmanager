import {removeComponent, renderComponent, replaceComponent} from "../utils/render";
import {onEscKeyDown} from "../utils/common";
import {Task} from "../components/task-card";
import {TaskEditCard} from "../components/task-edit-card";
import {NoTaskList} from "../components/no-tasks";
import {Sort} from "../components/sorting";
import {TaskList} from "../components/task-list";
import {LoadMoreButton} from "../components/load-more-button";

const BEGIN_INDEX = 0;
const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;

const renderTaskCards = (taskCardsElement, card) => {
  const replaceTaskToEdit = () => {
    replaceComponent(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replaceComponent(taskComponent, taskEditComponent);
  };

  const onCardCloseEsc = (evt) => {
    onEscKeyDown(evt, replaceEditToTask);
    document.removeEventListener(`keydown`, onCardCloseEsc);
  };

  const taskComponent = new Task(card);

  taskComponent.setEditButtonClickHandler((evt) => {
    evt.preventDefault();
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onCardCloseEsc);
  });

  const taskEditComponent = new TaskEditCard(card);

  taskEditComponent.setFormSubmitHandler(() => {
    replaceEditToTask();
    document.removeEventListener(`keydown`, onCardCloseEsc);
  });

  renderComponent(taskCardsElement, taskComponent);
};

const renderBoard = (boardComponent, cards) => {
  const isAllTasksArchived = cards.every((card) => card.isArchive);

  if (isAllTasksArchived) {
    renderComponent(boardComponent.getElement(), new NoTaskList());
    return;
  }

  renderComponent(boardComponent.getElement(), new Sort());
  renderComponent(boardComponent.getElement(), new TaskList());

  const taskCardsElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;
  cards.slice(BEGIN_INDEX, showingTasksAmount)
    .forEach((card) => {
      renderTaskCards(taskCardsElement, card);
    });

  const loadMoreButtonComponent = new LoadMoreButton();

  renderComponent(boardComponent.getElement(), loadMoreButtonComponent);

  loadMoreButtonComponent.setClickHandler(() => {
    const prevTasksCount = showingTasksAmount;
    showingTasksAmount = showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

    cards.slice(prevTasksCount, showingTasksAmount)
      .forEach((card) => renderTaskCards(taskCardsElement, card));

    if (showingTasksAmount >= cards.length) {
      removeComponent(loadMoreButtonComponent);
    }
  });
};

export class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    renderBoard(this._container, cards);
  }
}
