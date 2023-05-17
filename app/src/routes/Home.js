import BookList from "../components/BookList";
import Header from "../components/Header";
import { Component } from "../core/Component";
import { searchBooks } from "../store/book";

export default class Home extends Component {
  render() {
    const header = new Header().el;
    const bookList = new BookList().el;
    this.el.append(header, bookList);
    searchBooks(1);
  }
}
