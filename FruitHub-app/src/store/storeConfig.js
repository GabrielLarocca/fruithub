import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import fetching from './ducks/fetching';
import user from './ducks/user';
import noticia from './ducks/noticia';

const reducers = combineReducers({
	fetching,
	user,
	noticia
});


let store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;