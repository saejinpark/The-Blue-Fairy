import { Component } from "../core/Component";
import { Store } from "../core/Store";
import newBookStore, { update } from "../store/newBook";

export default class PublishContent extends Component {
  constructor(props) {
    super({
      tagName: "article",
    });
    this.store = new Store(props);
    this.render();
  }

  render() {
    if (!this.store) return;
    const { type, text, pos, pageIndex, contentIndex } = this.store.state;
    const page = newBookStore.state.pages[pageIndex];
    const content = page.contents[contentIndex];
    const { x, y } = pos;
    const fontSize = (() => {
      switch (type) {
        case "h1":
          return 40;
        case "h2":
          return 32;
        case "h3":
          return 28;
        case "p":
          return 18;
        case "ph":
          return 18;
      }
    })();
    const maxLen = parseInt((newBookStore.state.width / 2 - x) / fontSize) - 1;

    this.el.classList.add("content", `grid__content--${type}`);
    this.el.setAttribute("style", `left: ${x}px;top: ${y}px`);

    this.el.innerHTML = `
      <h3 class="blind">컨텐츠</h3>
      <div class="control">
        <button class="type">${type}</button>
        <button class="del">del</button>
      </div>
      <input type="text" maxlength="${maxLen}" placeholder="내용"/>
    `;
    const input = this.el.querySelector("input");
    input.value = text;
    input.style.width = `${
      input.value.length ? input.value.length * fontSize : fontSize * 2
    }px`;
    input.focus();
    input.addEventListener("input", (e) => {
      e.stopPropagation();
      input.style.width = `${
        input.value.length ? input.value.length * fontSize : fontSize * 2
      }px`;
      content["text"] = input.value.trim();
    });

    const typeBtn = this.el.querySelector(".type");
    typeBtn.addEventListener("click", (e) => {
      this.store.state.type = ((type) => {
        switch (type) {
          case "h1":
            return "h2";
          case "h2":
            return "h3";
          case "h3":
            return "p";
          case "p":
            return "ph";
          case "ph":
            return "h1";
        }
      })(type);
      content["type"] = this.store.state.type;
      update();
      this.render();
    });

    const delBtn = this.el.querySelector(".del");
    delBtn.addEventListener("click", () => {
      page.contents.splice(contentIndex, 1);
      update();
      this.el.remove();
    });
  }
}
