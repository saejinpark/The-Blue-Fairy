import { Component } from "../core/Component";

export default class Cover extends Component {
  constructor(props) {
    super({
      tagName: "section",
      props,
    });
  }

  render() {
    const { name, coverURL } = this.props;
    this.el.id = "cover";
    this.el.classList.add("page");
    this.el.innerHTML = `
      <h1 class="blind">커버</h1>
      <figure>
        <img class="cover__img" src='${coverURL}' alt=""/>
        <figcaption class="blind">${name} 이미지</figcaption>
      </figure>
    `;
    const inner = this.el.querySelector(".inner");
  }
}
