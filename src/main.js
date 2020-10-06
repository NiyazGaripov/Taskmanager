import {renderComponent} from './utils/render.js';

import {NavigationMenu} from './components/nav-menu.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {TaskList} from './components/task-list.js';
import {Sort} from './components/sorting.js';
import {TaskEditCard} from './components/task-edit-card.js';
import {Task} from './components/task-card.js';
import {LoadMoreButton} from './components/load-more-button.js';

import {generateCards} from './mock/card.js';
import {generateFilters} from './mock/filter.js';

const BEGIN_INDEX = 0;
const TASK_CARDS_AMOUNT = 22;
const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;

const renderTaskCards = (taskCardsElement, card) => {
  const replaceTaskToEdit = () => {
    taskCardsElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskCardsElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new Task(card);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);

  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
  });

  const taskEditComponent = new TaskEditCard(card);
  const editForm = taskEditComponent.getElement().querySelector(`form`);

  editForm.addEventListener(`submit`, () => {
    replaceEditToTask();
  });

  renderComponent(taskCardsElement, taskComponent.getElement());
};

const renderBoard = (boardComponent, cards) => {
  renderComponent(boardComponent.getElement(), new Sort().getElement());
  renderComponent(boardComponent.getElement(), new TaskList().getElement());

  const taskCardsElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;
  cards.slice(BEGIN_INDEX, showingTasksAmount)
    .forEach((card) => {
      renderTaskCards(taskCardsElement, card);
    });

  const loadMoreButtonComponent = new LoadMoreButton();

  renderComponent(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksAmount;
    showingTasksAmount = showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

    cards.slice(prevTasksCount, showingTasksAmount)
      .forEach((card) => renderTaskCards(taskCardsElement, card));

    if (showingTasksAmount >= cards.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, new NavigationMenu().getElement());
renderComponent(pageMainElement, new Filter(filters).getElement());

const boardComponent = new Board();
renderComponent(pageMainElement, boardComponent.getElement());
renderBoard(boardComponent, cards);
