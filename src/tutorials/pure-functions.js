console.info('---------------------');
console.info('Recap: Pure Functions');
console.info('---------------------');

// Before we start. Let's recap basics of Functional Programming
// Pure function are functions that have no side effect.

/* Adds X to Y */
const add = (x, y) => x + y;

// This means that function _does_ _not_ modify anything outside of it's scope.
// This gives us certanty that every time function is running, with same parameters it will give us same result.

console.info('add(1, 10) === add(1, 10):', add(1, 10) === add(1, 10));
console.info('add(2, 2) === add(2, 2):', add(2, 2) === add(2, 2));

/* Subtracts Y from X. */
const subtract = (x, y) => add(x, -y);

console.info('subtract(1, 1) === 0:', subtract(1, 1) === 0);
console.info('subtract(1, 1) === subtract(1, 1):', subtract(1, 1) === subtract(1, 1));

/* Multiplies X by Y */
const multiply = (x, y) => x * y;

console.info('multiply(2, 3) === 6:', multiply(2, 3) === 6);
console.info('multiply(4, 4) === multiply(4, 4):', multiply(4, 4) === multiply(4, 4));

// It's important to understand difference between _closures_ and _pure functions_.
// Closures have side effect.

const counter = () => {
  // Create local variable that will be invoked every time `counter` function is invoked.
  let count = -1;
  // Return a function, that increments `count` local variable, and returns the result.
  return () => ++count;
};

const countA = counter();

console.info('countA() !== countA():', countA() !== countA());
console.info('countA() !== countA():', countA() !== countA());

// This is called _side effect_. When function mutates some value outside of it.
