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

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onCardCloseEsc);
  });

  const taskEditComponent = new TaskEditCard(card);

  taskEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onCardCloseEsc);
  });

  renderComponent(taskCardsElement, taskComponent);
};

export class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTaskList();
    this._sortComponent = new Sort();
    this._taskListComponent = new TaskList();
    this._loadMoreButtonComponent = new LoadMoreButton();
  }

  render(cards) {
    const container = this._container.getElement();
    const isAllTasksArchived = cards.every((card) => card.isArchive);

    const renderLoadMoreButton = () => {
      if (showingTasksAmount >= cards.length) {
        return;
      }

      renderComponent(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksAmount;
        showingTasksAmount = showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

        cards.slice(prevTasksCount, showingTasksAmount)
          .forEach((card) => renderTaskCards(taskCardsElement, card));

        if (showingTasksAmount >= cards.length) {
          removeComponent(this._loadMoreButtonComponent);
        }
      });
    };

    if (isAllTasksArchived) {
      renderComponent(container, this._noTasksComponent);
      return;
    }

    renderComponent(container, this._sortComponent);
    renderComponent(container, this._taskListComponent);

    const taskCardsElement = this._taskListComponent.getElement();
    let showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;

    cards.slice(BEGIN_INDEX, showingTasksAmount)
      .forEach((card) => {
        renderTaskCards(taskCardsElement, card);
      });

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler(() => {
      showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;

      taskCardsElement.innerHTML = ``;

      cards.slice(BEGIN_INDEX, showingTasksAmount)
        .forEach((card) => {
          renderTaskCards(taskCardsElement, card);
        });

      renderLoadMoreButton();
    });

  }
}
