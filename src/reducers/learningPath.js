import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import reject from 'lodash/reject';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import assureSequenceOrder from '../util/assureSequenceOrder';
import assignOrPushPropReducer from '../util/assignOrPushPropReducer';

export default handleActions({
  SET_LEARNING_PATH: {
    next(state, action) {
      return Object.assign({},
        action.payload,
        { learningsteps: assureSequenceOrder(action.payload.learningsteps) }
      );
    },
    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_STEP: {
    next(state, action) {
      let nextState = cloneDeep(state);
      let steps = get(nextState, 'learningsteps', []);
      let index = findIndex(steps, ['seqNo', action.payload.seqNo]);

      if (index === -1) {
        steps.push(action.payload);
      } else {
        assign(steps[index], action.payload);
      }

      nextState.learningsteps = steps;

      return nextState;
    },

    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_TITLE: {
    next: assignOrPushPropReducer('title'),
    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_DESCRIPTION: {
    next: assignOrPushPropReducer('description'),
    throw(state) { return state; }
  },

  SORT_LEARNING_PATH_STEPS: {
    next(state, action) {
      if (state.learningsteps.length != action.payload.length){
        return state;
      }
      let nextState = cloneDeep(state);
      nextState.learningsteps = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_STEP_SEQ_NO: {
    next(state, action) {
      let nextState = cloneDeep(state);
      return nextState;
    },
    throw(state) { return state; }
  },

  LOGOUT: () => ({})
}, {});
