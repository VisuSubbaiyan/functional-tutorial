console.info('---------------------');
console.info('Map Reduce');
console.info('---------------------');

import {stockPrices} from './stocks';

// Sample lines from `stockPrices`:
// {id: 5, openingPrice: '37.65', closingPrice: '19.64'},
// We receive id as a number, and opening and closing price as a string.
// opening price is the price of the stock when market opens.
// closing price is the price of the stock when market closes.

// To operate prices we need to convert them into numbers.
const numberifyPrices = ({id, openingPrice, closingPrice}) => ({
  id,
  openingPrice: parseFloat(openingPrice, 10),
  closingPrice: parseFloat(closingPrice, 10),
});

// At this point we know enough about stock prices to ignore cheap ones.
const ignoreCheapStocks = ({openingPrice, closingPrice}) => openingPrice > 10 && closingPrice > 10;

const hasGrowthOpportunity = ({openingPrice, closingPrice}) => (closingPrice - openingPrice) > 0;

const createRecomendation = ({id, openingPrice, closingPrice}) => ({
  id,
  delta: closingPrice - openingPrice,
  cooficient: (closingPrice - openingPrice) / openingPrice,
  openingPrice,
  closingPrice,
});

const onlySubstantialGrowth = ({cooficient}) => cooficient > 2;

const sortByCooficient = ({cooficient: cx}, {cooficient: cy}) => cy - cx;

const pretty = (minCharacters, integer = false) => (number) => {
  let result = integer ? parseInt(number, 10).toString() : number.toFixed(2);

  while (result.length < minCharacters) {
    result = `0${result}`;
  }

  return result;
};

const pretifyRecommendation = ({id, openingPrice, closingPrice, delta, cooficient}) => {
  const atLeastFour = pretty(4, true);
  const percent = pretty(3, true);
  const price = pretty(7);

  return {
    id: atLeastFour(id),
    openingPrice: price(openingPrice),
    closingPrice: price(closingPrice),
    delta: price(delta),
    cooficient: `${percent(cooficient * 100)}%`,
  };
};

const compileReport = (doc, {id, openingPrice, closingPrice, delta, cooficient}) => (
  `${doc}\n| ${id} | ${openingPrice} | ${closingPrice} | ${delta} |  ${cooficient}  |`
);

const report = stockPrices
  // Map allows us to change individual items in the list.
  .map(numberifyPrices)
  // Filter allows us to filter list. It's invoked on each item in the list and returns true or false.
  .filter(ignoreCheapStocks)
  .filter(hasGrowthOpportunity)
  .map(createRecomendation)
  .filter(onlySubstantialGrowth)
  .sort(sortByCooficient)
  .map(pretifyRecommendation)
  .reduce(compileReport, '|  id  | Opening | Closing |  Delta  | Growth |');

console.info('-------------------');
console.info('Processed Stocks');
console.info(report);
console.info('-------------------');
