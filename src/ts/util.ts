export function $(selector: string, base: HTMLElement | Document = document) {
  return base.querySelector<HTMLElement>(selector);
}
