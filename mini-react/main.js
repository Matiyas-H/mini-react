import { MiniReact } from './miniReact.js';

function Welcome({ name }) {
  return MiniReact.createElement(
    "h1",
    {},
    `Hello ${name}`
  )
}

const vdom = MiniReact.createElement(Welcome, { name: "there" });
const container = document.getElementById("root");
MiniReact.render(vdom, container);


