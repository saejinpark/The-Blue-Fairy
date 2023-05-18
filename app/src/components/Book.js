import { Component } from "../core/Component";
import bookStore, { getBookDetails } from "../store/book";
import Cover from "./Cover";
import Page from "./Page";

export default class Book extends Component {
  constructor() {
    super({
      tagName: "main",
    });
  }

  async render() {
    this.el.id = "book";
    const { id } = history.state;
    await getBookDetails(id);
    const { book } = bookStore.state;
    this.el.id = "book";
    this.el.innerHTML = `
      <div class="inner">
        <div class="wrapper">

        </div>
      </div>
    `;
    const cover = new Cover(book).el;
    const inner = this.el.querySelector(".inner");
    const wrapper = this.el.querySelector(".wrapper");
    wrapper.append(cover);
    const pages = book.pages
      ? book.pages.map((page) => new Page(page).el)
      : null;
    if (pages) {
      wrapper.append(...pages);
    }
    setTimeout(() => {
      const coverWidth = cover.offsetWidth;
      inner.style.width = `${coverWidth * 2}px`;
      if (pages) {
        pages.forEach((page) => (page.style.width = coverWidth + "px"));
      }
    }, 1);
  }
}
