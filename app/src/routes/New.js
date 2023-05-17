import Publish from "../components/Publish";
import { Component } from "../core/Component";

export default class New extends Component {
  render() {
    const publish = new Publish().el;
    this.el.append(publish);
  }
}
