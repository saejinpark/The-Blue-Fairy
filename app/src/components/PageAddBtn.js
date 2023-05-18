import { Component } from "../core/Component";

export default class PageAddBtn extends Component {
  constructor() {
    super({
      tagName: "button"
    })
  }
  render() {
    this.el.classList.add("page-add-btn")
    this.el.innerHTML = `
      📝
    `
  }
}