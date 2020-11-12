import {renderComponent, removeComponent, replaceComponent} from './utils/render.js';
import {onEscKeyDown} from './utils/common.js';

import {NavigationMenu} from './components/nav-menu.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {TaskList} from './components/task-list.js';
import {Sort} from './components/sorting.js';
import {TaskEditCard} from './components/task-edit-card.js';
import {Task} from './components/task-card.js';
import {LoadMoreButton} from './components/load-more-button.js';
import {NoTaskList} from './components/no-tasks.js';

import {generateCards} from './mock/card.js';
import {generateFilters} from './mock/filter.js';

const BEGIN_INDEX = 0;
const TASK_CARDS_AMOUNT = 22;
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

const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, new NavigationMenu());
renderComponent(pageMainElement, new Filter(filters));

const boardComponent = new Board();
renderComponent(pageMainElement, boardComponent);
renderBoard(boardComponent, cards);
