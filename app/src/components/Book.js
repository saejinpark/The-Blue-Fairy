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

  render() {
    this.el.id = "book";
    const { id } = history.state;
    getBookDetails(id);
    const { book } = bookStore.state;
    this.el.id = "book";
    this.el.innerHTML = `
      <div class="inner"></div>
    `;
    const cover = new Cover(book).el;
    const inner = this.el.querySelector(".inner");
    inner.append(cover);
    const pages = book.pages
      ? book.pages.map((page) => new Page(page).el)
      : null;
    if (pages) {
      inner.append(...pages);
    }
    setTimeout(() => {
      const CoverWidth = cover.offsetWidth;
      inner.style.width = `${CoverWidth * 2}px`;
      if (pages) {
        pages.forEach((page) => (page.style.width = CoverWidth + "px"));
      }
    }, 1);
  }
}
