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
  const onEditButtonClick = () => {
    taskCardsElement.replaceChild(TaskEditCard.getElement(), Task.getElement());
  };

  const onEditFormSubmit = () => {
    taskCardsElement.replaceChild(Task.getElement(), TaskEditCard.getElement());
  };

  const taskComponent = new Task(card);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditCard(card);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  renderComponent(taskCardsElement, taskComponent.getElement());
};

const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, new NavigationMenu().getElement());
renderComponent(pageMainElement, new Filter(filters).getElement());
