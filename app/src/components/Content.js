import { Component } from "../core/Component";

export default class Content extends Component {
  constructor(props) {
    super({
      tagName: "article",
      props,
    });
  }

  render() {
    this.el.classList.add("content");
    const { id, type, text, pos } = this.props;
    const { x, y } = pos;
    this.el.setAttribute("style", `--pos-t:${x};--pos-l:${y}`);
    switch (type) {
      case "h1":
      case "h2":
      case "h3":
        const tagName = type;
        this.el.classList.add("page__item--h");
        this.el.innerHTML = `
          <${tagName}>${text}<${tagName}>
        `;
        break;
      case "p":
        this.el.classList.add("page__item--p");
        this.el.innerHTML = `
          <p>${text}<p>
        `;
        break;
      case "ph":
        this.el.classList.add("page__item--ph");
        this.el.innerHTML = text
          .split(" ")
          .map(
            (word) =>
              `<input type="text" placeholder="${word}" style="width:${
                word.length * 13
              }px">`
          )
          .join(" ");
        const inputs = this.el.querySelectorAll("input:nth-child(n + 1)");
        const inputArray = Array.from(inputs);
        inputArray.slice(0, inputArray.length - 1).forEach((input, i) => {
          input.addEventListener("keydown", (e) => {
            if (e.key == " ") {
              e.preventDefault();
              inputArray[i + 1].focus();
              inputArray[i + 1].value = "";
            }
          });
        });
        break;
    }
  }
}
