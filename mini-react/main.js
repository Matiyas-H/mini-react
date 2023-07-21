import { MiniReact } from './miniReact.js';

const vdom = MiniReact.createElement("h1", { id: "some-id" }, "Hello mf");
const container = document.getElementById("root");
MiniReact.render(vdom, container);


