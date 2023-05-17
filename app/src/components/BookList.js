import { Component } from "../core/Component";
import bookStore from "../store/book";
import BookItem from "./BookItem";

export default class BookList extends Component {
  constructor() {
    super({
      tagName: "main",
    });
    bookStore.subscribe("books", () => {
      this.render();
    });
    bookStore.subscribe("loading", () => {
      this.render();
    });
    bookStore.subscribe("message", () => {
      this.render();
    });
  }

  render() {
    this.el.id = "books";
    this.el.innerHTML = `
      <div class="inner">
        ${
          bookStore.state.message
            ? `<div class="message">${bookStore.state.message}</div>`
            : '<ul class="books__ul"></ul>'
        }
        <div class="the-loader hide"></div>
      </div>
    `;

    const bookEl = this.el.querySelector(".books__ul");
    bookEl?.append(
      ...bookStore.state.books.map((book) => new BookItem(book).el)
    );
  }
}
