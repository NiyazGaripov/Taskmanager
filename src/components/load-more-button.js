import {AbstractComponent} from "./abstract-component";

const createLoadMoreButtonComponent = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonComponent();
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
}
