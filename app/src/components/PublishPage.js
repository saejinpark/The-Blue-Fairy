import { Component } from "../core/Component";
import newBookStore, { update } from "../store/newBook";
import PublishContent from "./PublishContents";

export default class PublishPage extends Component {
  constructor(props) {
    super({
      tagName: "section",
      props,
    });
  }

  setContent() {
    const { index } = this.props;
    const page = newBookStore.state.pages[index];
    const { contents } = page;
    const grid = this.el.querySelector(".grid");
    grid.append(
      ...contents.map(
        (props, i) =>
          new PublishContent({ ...props, pageIndex: index, contentIndex: i }).el
      )
    );
  }

  render() {
    const { index } = this.props;
    this.el.classList.add("page");
    this.el.innerHTML = `
      <h3 class="blind">페이지</h3>
      <div class="grid"></div>
    `;
    const pageWidth = newBookStore.state.width / 2;
    const pageHeight = newBookStore.state.height;

    const grid = this.el.querySelector(".grid");
    grid.addEventListener("click", (e) => {
      if (!e.target.classList.contains("grid")) {
        return;
      }
      const { offsetX, offsetY } = e;
      const page = newBookStore.state.pages[index];
      if (
        offsetX < 30 ||
        offsetX > pageWidth - 100 ||
        offsetY > pageHeight - 50
      ) {
        return;
      }
      page.contents.push({
        type: "h1",
        text: "",
        pos: {
          x: offsetX,
          y: offsetY,
        },
      });
      update();
      this.render();
    });
    this.setContent();
  }
}
