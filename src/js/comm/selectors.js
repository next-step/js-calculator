export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector,container) => {
    if(!container) {
        return document.querySelectorAll(selector);
    }
    return container.querySelectorAll(selector);
}
