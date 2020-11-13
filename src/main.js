import {renderComponent} from './utils/render.js';
import {NavigationMenu} from './components/nav-menu.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {generateCards} from './mock/card.js';
import {generateFilters} from './mock/filter.js';
import {BoardController} from './controllers/board';

const TASK_CARDS_AMOUNT = 22;

const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, new NavigationMenu());
renderComponent(pageMainElement, new Filter(filters));

const boardComponent = new Board();
renderComponent(pageMainElement, boardComponent);
const board = new BoardController(boardComponent);
board.render(cards);
