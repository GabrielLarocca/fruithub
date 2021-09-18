import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import metrica from './ducks/metrica';
import fetching from './ducks/fetching';
import user from './ducks/user';
import noticia from './ducks/noticia';

const reducers = combineReducers({
	fetching,
	user,
	metrica,
	noticia
});


let store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;