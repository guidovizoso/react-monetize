function addListeners(events) {
  events.forEach((e) => {
    (document as any).monetization.addEventListener(e.name, e.handler);
  });
}

function removeListeners(events) {
  events.forEach((e) => {
    (document as any).monetization.removeEventListener(e);
  });
}

export { addListeners, removeListeners };
