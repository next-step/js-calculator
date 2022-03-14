const TotalPad = $target => {
  const $total = document.createElement('h1');
  $total.id = 'total';
  $total.textContent = '0';
  $target.appendChild($total);
};
export default TotalPad;
