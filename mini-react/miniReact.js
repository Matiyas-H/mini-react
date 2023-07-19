export const MiniReact = {
    createElement(type, props, ...childeren) {
        return {
            //the type of element to create, div, button or func
            type,
            // the props of the element this includes any attribute we will pass in jsx such as id or className.
            props: {
                ...props,
                // we should always the children to be array even if it contain one element.
                childeren: childeren.map((child) => {
                    // if the child is object then its react element and we keep it as it is
                    //otherwise, it's string and and we create a element obejct from it.
                    return typeof child == "object"
                        ? child
                        : this.createTextElement(child);
                }),
            },
        };
    },
    createElement(text) {
        return {
            // text element is just like any other element but it's type is text_element
            // it has also a nodeValue that will contain the text
            type: "TEXT_ELEMENT",
            props: {
                nodeValue: text,
                // text elements doesn't have any child element so it's empty.
                childeren: [],
            },
        };
    },
};


