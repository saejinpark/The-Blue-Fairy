import { Component } from "../core/Component";

export default class Cover extends Component {
  constructor(props) {
    super({
      tagName: "section",
      props,
    });
  }

  render() {
    const { name, imgURL } = this.props;
    this.el.id = "cover";
    this.el.classList.add("page");
    this.el.innerHTML = `
      <h1 class="blind">커버</h1>
      <figure>
        <img src='${imgURL}' alt=""/>
        <figcaption class="blind">${name} 이미지</figcaption>
      </figure>
    `;
  }
}
