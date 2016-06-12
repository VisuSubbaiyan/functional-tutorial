import {green, red, cyan} from 'colors';
import {
  today, tomorrow, nextWeek,
  computeAppState,
  addTask,
} from './taskr';

const toTasksArray = (tasks) => Object.keys(tasks).map((uuid) => tasks[uuid]);

const notDone = ({status}) => status !== 'done';

const before = (untill) => ({due}) => due < untill + 100000; // until should be slightly fuzzy

const displayTask = ({description, due, status}) => {
  const s = status === 'done' ? 'Done!' : `Due ${new Date(due).toUTCString()}`;
  console.info(cyan(`* ${description} - ${s}`));
};

const Taskr = {
  /**
   * List of actions.
   *
   * @private
   */
  actions: [],

  state: null,

  /**
   * Indicates current time.
   *
   * @private
   */
  time: 0,

  /**
   * Returns initial application state.
   */
  get initialState() {
    return {tasks: {}};
  },
  /**
   * Dispatches an `action` privded in argument if application is not in time travel mode.
   *
   * @private
   */
  dispatch(action) {
    if (this.actions.length !== this.time) {
      console.info(red('You are in time travel/debug mode'));
      console.info(red('Dispatching is locked, rewind to last action'));
      return;
    }

    this.actions = this.actions.concat([action]);
    const s = this.state || this.initialState;

    this.state = computeAppState(s, action);
    this.time = this.actions.length;
  },

  addTask(description, due = tomorrow()) {
    this.dispatch(addTask(description, due));
  },

  viewAllActions() {
    const {actions: {length}} = this;
    console.info(cyan('View - All Actions'));
    console.info(green(`Number of actions: ${length}`));

    return true;
  },

  viewNumAllTasks() {
    const {tasks} = this.state;

    console.info(cyan('View - Number of Tasks'));
    console.info(green(`Number of tasks: ${Object.keys(tasks).length}`));
  },

  viewAllTasks() {
    console.info(cyan('View - All Tasks'));
    const {tasks} = this.state;

    toTasksArray(tasks)
      .forEach(displayTask);
  },

  viewForecast(untill = tomorrow()) {
    console.info(cyan('View - Forecast'));
    const {tasks} = this.state;

    toTasksArray(tasks)
      .filter(notDone)
      .filter(before(untill))
      .forEach(displayTask);
  },
};

module.exports = {Taskr, today, tomorrow, nextWeek};
