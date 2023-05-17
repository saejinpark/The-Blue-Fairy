import { Component } from "../core/Component";

export default class BookItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: "li",
    });
  }

  render() {
    this.el.classList.add("books__li");
    const { id, name, imgURL } = this.props;
    this.el.innerHTML = `
      <figure>
        <img src="${imgURL}" alt=""/>
        <figcaption class="blind">${name}</figcaption>
      </figure>
      <dl>
        <dt class="blind">책 제목</dt>
        <dd>${name
          .split(" ")
          .map((word, i) => (i % 2 ? `<span>${word}</span>` + "<br />" : `<span style="--ml: ${i}">${word}</span>`)).join(" ")}</dd>
      </dl>
      <a class="btn link" href="#/view?id=${id}">보러가기 </a>
    `;
  }
}
