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
        container.innerHTML = '';
        _render(element, container);
    },
};



function _render(element, conainer) {
    const dom = element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

    const isProperty = key => key != 'children';
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props.name;
        });
    element.props.children(child => {
        _render(child, dom);
    })
    container.appendChild(dom);
}


