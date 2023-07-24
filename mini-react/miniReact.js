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

export function buildDOM(vdom) {
    // Text node
    if (vdom.type === "TEXT") {
        return document.createTextNode(vdom.props.nodeValue);
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
            dom.appendChild(buildDOM(child));
        });

        return dom;
    }
}

function updateDOM(dom, oldVdom, newVdom) {
    if (oldVdom.type !== newVdom.type) {
        const newDom = createDOM(newVdom);
        dom.parentNode.replaceChild(newDom, dom);
    } else {
        updateProps(dom, oldVdom.props, newVdom.props);
        updateChildren(dom, oldVdom.children, newVdom.children);
    }
}

function useState(initialValue) {
    const component = MiniReact.currentComponent;
    const currentCursor = component.stateCursor;
    component.state[currentCursor] = component.state[currentCursor] ?? initialValue;
    const setState = (newState) => {
        component.state[currentCursor] = newState;
        MiniReact.render(component, document.getElementById('root')); // re-render
    };
    component.stateCursor++; // Increment the cursor for the next hook call.
    return [component.state[currentCursor], setState];
}


export const MiniReact = {
    currentComponent: null,
    currentVdom: null,
    render(vdom, container) {
        const component = typeof vdom.type === "function" ? vdom.type(vdom.props) : vdom;
        if (this.currentVdom == null) {
            // If there's no existing vDOM, we build the DOM and append it to the container.
            const newDom = buildDOM(component);
            container.appendChild(newDom);
        } else {
            // Otherwise, we update the existing DOM.
            updateDOM(container.firstChild, this.currentVdom, component);
        }

        // Update our current vDOM and currentComponent.
        this.currentVdom = component;
        this.currentComponent = component;
    },
}

