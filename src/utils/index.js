export const getSelector = (selector, type = 'id') => {
 if (type === 'id') return '#' + selector;
 if (type === 'class') return '.' + selector;
 return selector;
};
