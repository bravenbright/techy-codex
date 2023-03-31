module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  greaterThan: (a, b) => {
    return a > b;
  },
  equal: (a, b) => {
    return a == b;
  },
  notEqual: (a, b) => {
    return a != b;
  },
  increment: (a) => {
    return parseInt(a) + 1;
  },
  decrement: (a) => {
    return parseInt(a) - 1;
  },
};
