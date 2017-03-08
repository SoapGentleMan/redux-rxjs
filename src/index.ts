import 'rxjs'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import createLogger from 'redux-logger'

const buttonEpics = action$ => action$.ofType('click').delayTime(1000).map(() => ({type: 'add', data: 'add'}));

const Epics = createEpicMiddleware(buttonEpics);

const middleware = [];
middleware.push(Epics);

const log = createLogger({
  level: 'info'
});
middleware.push(log);

const store = createStore(combineReducers({
  'main': (state = {}, action) => {
    switch(action.type) {
      case 'click': {
        return {
          state: action.data
        }
      }
      case 'add': {
        return {
          state: action.data
        }
      }
      default:
        return state
    }
  }
}), applyMiddleware(...middleware));

document.getElementById('a').addEventListener('click', () => store.dispatch({type: 'click', data: 'click'}));