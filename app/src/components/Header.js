import { Component } from "../core/Component";
import logoImg from "../img/logo.png";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }

  render() {
    this.el.innerHTML = `
      <div class="inner">
        <figure class="logo">
          <img class="logo__img" src="${logoImg}"/>
          <span class="logo__text">The Blue Fairy</span>
          <figcaption class="blind">푸른요정</figcaption>
        </figure>
        <nav>
          <ul>
            <li>
              <a href="#/">home</a>
            </li>
            <li>
              <a href="#/new">new</a>
            </li>
            <li>
              <a href="#/view">view</a>
            </li>
          </ul>
        </nav>
      </figure>
    `;
  }
}
