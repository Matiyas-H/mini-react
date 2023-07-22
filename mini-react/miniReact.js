export const MiniReact = {
    createElement(type, props, ...children) {
        if (typeof type === "function") {
            return type(props);
        } else {
            return {
                type,
                props: {
                    ...props,
                    children: children.map((child) =>
                        typeof child === "object"
                            ? child
                            : MiniReact.createTextElement(child)
                    ),
                },
            };
        };
    },
    createTextElement(text) {
        return {
            type: "TEXT_ELEMENT",
            props: {
                nodeValue: text,
                children: [],
            },
        };
    },

    render(element, container) {
        const dom =
            element.type === "TEXT_ELEMENT"
                ? document.createTextNode("")
                : document.createElement(element.type);

        const isProperty = (key) => key !== "children";
        Object.keys(element.props)
            .filter(isProperty)
            .forEach((name) => {
                dom[name] = element.props[name];
            });

        element.props.children.forEach((child) =>
            MiniReact.render(child, dom)
        );

        container.appendChild(dom);
    },
};


// Utilities for creating virtual DOM nodes 

export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(c =>
                typeof c === "object" ? c : createTextElement(c)
            )
        }
    }
}