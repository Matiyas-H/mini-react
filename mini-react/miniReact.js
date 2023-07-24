
export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object" ? child : createTextElement(child)
            ),
        }
    };
}

export function createTextElement(text) {
    return {
        type: "TEXT",
        props: {
            nodeValue: text,
            children: [],
        }
    };
}

export function buildDOM(vdom, container) {

    const node = vdom.type === "TEXT_ELEMENT" ?
        document.createTextNode(vdom.props.nodeValue) : document.createElement(vdom.type);

    Object.keys(vdom.props)
        .filter(key => key !== 'children')
        .forEach(name => {
            node[name] = vdom.props[name];
        })

    // Build and append children  
    vdom.props.children.forEach(child => {
        buildDOM(child, node);
    });

    // Append to container
    container.appendChild(node);
}




export const MiniReact = {

    render(vdom, container) {
        // Reset container
        container.innerHTML = '';

        // Recursively build DOM 
        buildDOM(vdom, container)

    }
}
