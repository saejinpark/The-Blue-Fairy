import { Component } from "../core/Component";

export default class Home extends Component {
  render() {
    const h1 = document.createElement("h1");
    h1.textContent = "The Blue Fairy";
    this.el.append(h1);
  }
}
