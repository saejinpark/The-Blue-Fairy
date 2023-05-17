import { Component } from "../core/Component";
import Book from "../components/Book";

export default class View extends Component {
  render() {
    const book = new Book().el;
    this.el.append(book);
  }
}
