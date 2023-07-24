import { createElement, createTextElement, MiniReact } from "./miniReact";

const vdom = createElement("div", {}, createTextElement("Hello there"));
const container = document.getElementById("root")
MiniReact.render(vdom, container);

console.log('Rendering to container', container);
console.dir(container);

