const getRndInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRndItemFromArray = array => {
  return array[Math.floor(Math.random() * array.length)]
}

const getRndNumByDigits = digit => {
  let num = Math.pow(10, digit)
  return (Math.floor(Math.random() * num) + num).toString().substring(1);
}

module.exports = {
  getRndInteger,
  getRndItemFromArray,
  getRndNumByDigits
};