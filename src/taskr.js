
// Helper functions.
// Fake UUID/GUID
const uuid = () => (Math.round(Math.random() * (Date.now() / 200))).toString(31);
// Today
export const today = () => Date.now();

// Tomorrow
export const tomorrow = () => today() + (1000 * 60 * 60 * 24);

// Next Week
export const nextWeek = () => today() + (1000 * 60 * 60 * 24 * 7);

// Copy object.
const copy = (original, changes) => Object.assign({}, original, changes);

// Action Creators
export const addTask = (description, due) => ({type: 'addTask', payload: {description, due}});
// const completeTask = (uuid) => ({type: 'completeTask', payload: {uuid}});

// const appState = {
//   tasks: {},
// };
//
// const actions = [
//   addTask('Write Low Level Documentation for Search Screen', tomorrow()),
//   addTask('Write Low Level Documentation for Search and Load operations', tomorrow()),
//   addTask('Update meeting agenda', tomorrow()),
//   addTask('Fill in timesheets for the week of 10th of June', today()),
//   addTask('Fill in timesheets for the week of 16th of June', nextWeek()),
// ];

export const computeAppState = (state, {type, payload}) => {
  switch (type) {
    case 'addTask': {
      const id = uuid();
      return copy(state, {
        tasks: copy(state.tasks, {
          [id]: copy(payload, {
            uuid: id,
            status: 'todo',
          }),
        }),
      });
    }
    default: { return state; }
  }
};
