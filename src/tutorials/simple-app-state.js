
const simpleInitialAppState = 0;

const streamOfActions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const produceNextAppState = (currentState, action) => currentState + action;

export const runSimpleAppState = () => {
  console.info('Running part a');

  console.info('Original app state:', simpleInitialAppState);
  const newState = streamOfActions.reduce(produceNextAppState, simpleInitialAppState);
  console.info('App state after all the action:', newState);
};

runSimpleAppState();
