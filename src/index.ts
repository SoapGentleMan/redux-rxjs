import 'rxjs'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createEpicMiddleware, combineEpics} from 'redux-observable'
import createLogger from 'redux-logger'

const buttonEpics = (action$, store) => action$.ofType('click').delay(1000).map(() => ({type: 'add', data: 'add'}));
const addEpics = (action$, store) => action$.ofType('add').delay(1000).map(() => ({type: 'click', data: 'click'}));

const rootEpics = combineEpics(buttonEpics, addEpics);

const Epics = createEpicMiddleware(rootEpics);

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

document.getElementById('a').addEventListener('click', () => {
  store.dispatch({type: 'click', data: 'click'});
});