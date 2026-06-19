export function el<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
  } = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tagName);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  for (const [key, value] of Object.entries(options.attrs ?? {})) {
    node.setAttribute(key, value);
  }
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

export function button(
  label: string,
  onClick: () => void,
  className = 'button',
): HTMLButtonElement {
  const node = el('button', { className, text: label });
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

export function fieldLabel(text: string, input: HTMLElement): HTMLLabelElement {
  const label = el('label', { className: 'field-label' });
  label.append(el('span', { text }), input);
  return label;
}

export function clearAndAppend(root: HTMLElement, child: Node): void {
  root.replaceChildren(child);
}
