import { Component } from "../core/Component";
import newBookStore, { postNewBook, update } from "../store/newBook";
import PageAddBtn from "./PageAddBtn";
import PublishPage from "./PublishPage";

export default class Publish extends Component {
  constructor() {
    super({
      tagName: "main",
    });
    newBookStore.subscribe("coverURL", () => {
      this.render();
    });
    newBookStore.subscribe("pages", () => {
      this.render();
    });
  }

  coverInputSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const nameInput = form.querySelector("#name");
    const urlInput = form.querySelector("#url");
    newBookStore.state.name = nameInput.value;
    newBookStore.state.coverURL = urlInput.value;
  }

  addPageBtnHandler(e) {
    e.preventDefault();
    newBookStore.state.pages = [
      ...newBookStore.state.pages,
      {
        contents: [],
      },
    ];
  }

  renderCoverInput() {
    this.el.innerHTML = `
      <div class="center">
        ${
          newBookStore.state.message
            ? `<p>${newBookStore.state.message}</p>`
            : "<p></p>"
        }
        <form class="cover-form">
          <fieldset>
            <legend>제목</legend>
            <input type="text" name="name" id="name" minlength="1" require>
          </fieldset>
          <fieldset>
            <legend>커버이미지 주소</legend>
            <input type="url" name="url" id='url' require/>
          </fieldset>
          <button>
            만들기
          </button>
        </form>
      </div>
    `;
    const coverForm = this.el.querySelector(".cover-form");
    coverForm?.addEventListener("submit", this.coverInputSubmitHandler);
  }

  render() {
    this.el.id = "publish";
    if (!newBookStore.state.coverURL) {
      this.renderCoverInput();
      return;
    }

    this.el.innerHTML = `
      <div class="inner">
        <button class="save-btn">save</button>
        <div class="wrapper">
          <section id="cover">
            <h2 class="blind">커버이미지</h2>
            <figure>
              <img src="${newBookStore.state.coverURL}" />
              <figcaption class="blind">나중에 이미지 설명 넣을거임</figcaption>
            </figure>
          </section>
        </div>
      </div>
    `;
    const saveBtn = this.el.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      update();
    });

    const inner = this.el.querySelector(".inner");
    const wrapper = this.el.querySelector(".wrapper");
    const cover = this.el.querySelector("#cover");
    const pageAddBtn = new PageAddBtn().el;

    setTimeout(() => {
      const coverWidth = cover.offsetWidth;
      const coverHeight = cover.offsetHeight;
      const bookWidth = coverWidth * 2;
      if (bookWidth > screen.width) {
        newBookStore.state.message = "이미지가 너무 넓습니다.";
        newBookStore.state.coverURL = "";
        return;
      }
      if (bookWidth < 800) {
        newBookStore.state.message = "이미지가 너무 좁습니다.";
        newBookStore.state.coverURL = "";
        return;
      }
      if (!newBookStore.state.id) {
        postNewBook();
      }
      newBookStore.state.width = bookWidth;
      newBookStore.state.height = coverHeight;
      inner.setAttribute("style", `--cover-width:${coverWidth}px`);

      const pages = newBookStore.state.pages.map(
        (props, i) =>
          new PublishPage({
            ...props,
            index: i,
            direction: i % 2 ? "left" : "right",
          })
      );
      wrapper.append(...pages.map((page) => page.el), pageAddBtn);

      pageAddBtn.addEventListener("click", this.addPageBtnHandler);
      newBookStore.state.message = "";
    }, 50);
  }
}
