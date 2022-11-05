export const divideOperatorAndNumber = (text) => {
  if (text.includes('+')) {
    const [a, b] = text.split('+');
    return [a, b, '+'];
  }
  if (text.includes('-')) {
    const [a, b] = text.split('-');
    return [a, b, '-'];
  }
  if (text.includes('X')) {
    const [a, b] = text.split('X');
    return [a, b, 'X'];
  }
  if (text.includes('/')) {
    const [a, b] = text.split('/');
    return [a, b, '/'];
  }
  return [text, '', ''];
};
