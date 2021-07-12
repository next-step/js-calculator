export const $get = (selector) => document.querySelector(selector)

export const $getAll = (selector) => document.querySelectorAll(selector)

export const checkOnlyNum = (str) => /^[0-9]+$/.test(str)
