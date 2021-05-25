'use strict';

export const $ = (selector, element = document) => {
  return element.querySelector(selector);
};
