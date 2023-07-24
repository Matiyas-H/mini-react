
export function createElement(type, props, ...children) {
    if (typeof type == 'function') {
        return type(props);
    } else {
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
    // Text node
    if (vdom.type === "TEXT") {
        const node = document.createTextNode(vdom.props.nodeValue);
        container.appendChild(node);
    }

    // Element node
    else {
        const dom = document.createElement(vdom.type);

        // Add props
        Object.keys(vdom.props)
            .filter(key => key !== 'children')
            .forEach(name => {
                dom[name] = vdom.props[name];
            });

        // Build and append children  
        vdom.props.children.forEach(child => {
            buildDOM(child, dom);
        });

        // Append to container
        container.appendChild(dom);
    }
}




export const MiniReact = {

    render(vdom, container) {
        // Reset container
        container.innerHTML = '';

        // Recursively build DOM 
        buildDOM(vdom, container)

    }
}
