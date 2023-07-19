import { MiniReact } from './miniReact';

// the process of creating element representation.
const element = MiniReact.createElement(
  'div', // types or node value
  { id: 'foo' }, // props
  'Hello', // childeren
  MiniReact.createElement('span', 'null', 'world'), // this is nested element in the above elemenet 
)


// const element_two = MiniReact.createElement(
//   "div",
//   { className: "greeting" },
//   "h1",
//   null,
//   "Hello world!"
// )
console.log(element);
