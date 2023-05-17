import { Component } from "../core/Component";
import Content from "./Content";

export default class Page extends Component {
  constructor(props) {
    super({
      tagName: "section",
      props,
    });
  }

  render() {
    const { contents } = this.props;
    this.el.classList.add("page");
    this.el.innerHTML = `
      <h2 class="blind">페이지</h2>
      <div class="inner">

      </div>
    `;
    const inner = this.el.querySelector(".inner");
    inner.append(...contents.map((props) => new Content(props).el));
    
  }
}
