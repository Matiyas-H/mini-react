import { MiniReact } from './miniReact.js';

const App = MiniReact.createElement(
  "div",
  null,
  MiniReact.createElement("h1", {}, "Hello World!"),
  MiniReact.createElement("p", {}, "Welcome to React"),
  MiniReact.createElement("button", { onclick: () => { console.log("it works") } }, "button")
);

function greeting({ name }) {
  return "sup " + name;
}



MiniReact.render(App, document.getElementById("root"));


