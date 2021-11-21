export function getRandomIntInclusive(min = 0, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

export function cipherNumber(...arr) {
  return arr.reduceRight((sum, ele, i) => {
    return sum += ele * Math.pow(10, arr.length - 1 - i);
  }, 0);
}