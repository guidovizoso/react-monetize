function addListenerToElement(element, event) {
    element.addEventListener(event.name, event.handler);
}

function removeListenerFromElement(element, event) {
    element.removeEventListener(event.name, event.handler);
}

export { addListenerToElement, removeListenerFromElement };
