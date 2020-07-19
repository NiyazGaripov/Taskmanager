import {renderComponent} from './utils/render.js';

import {createNavigationMenuComponent} from './components/nav-menu.js';
import {createFilterComponent} from './components/filter.js';
import {createSortComponent} from './components/sorting.js';
import {createTaskEditCardComponent} from './components/task-edit-card.js';
import {createTaskCardComponent} from './components/task-card.js';
import {createLoadMoreButtonComponent} from './components/load-more-button.js';

import {generateCards} from './mock/card.js';
import {generateFilters} from './mock/filter.js';

const BEGIN_INDEX = 0;
const TASK_CARDS_AMOUNT = 22;
const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;
const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, createNavigationMenuComponent());
renderComponent(pageMainElement, createFilterComponent());
renderComponent(pageMainElement, createSortComponent(filters));

const taskCardsElement = pageMainElement.querySelector(`.board__tasks`);
const boardElement = pageMainElement.querySelector(`.board`);

renderComponent(taskCardsElement, createTaskEditCardComponent(cards[0]));

let showingTaskCards = TASK_CARDS_AMOUNT_ON_START;

cards
  .slice(BEGIN_INDEX, showingTaskCards)
  .forEach((card) => {
    renderComponent(taskCardsElement, createTaskCardComponent(card));
  });

renderComponent(boardElement, createLoadMoreButtonComponent());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCards = showingTaskCards;
  showingTaskCards = showingTaskCards + TASK_CARDS_AMOUNT_LOAD_MORE;

  cards
    .slice(prevTaskCards, showingTaskCards)
    .forEach((card) => {
      renderComponent(taskCardsElement, createTaskCardComponent(card));
    });
  if (showingTaskCards >= cards.length) {
    loadMoreButton.remove();
  }
});
