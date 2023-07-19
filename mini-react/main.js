import { MiniReact } from './miniReact.js';

const element = MiniReact.createElement(
  "div",
  { id: "foo" },
  "Hellow there"
);
const container = document.getElementById("root");
MiniReact.render(element, container);
