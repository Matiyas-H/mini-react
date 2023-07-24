import { createElement, createTextElement, MiniReact } from "./miniReact";


function Welcome({ name }) {
  return createElement("h1", {}, `Hello ${name}`);
}

const vdom = createElement(Welcome, { name: "Matt" });

const container = document.getElementById("root")
MiniReact.render(vdom, container);

