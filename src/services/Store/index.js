import rootReducer from './Reducers/index';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

// export default store;
// export default () => {
const enhancer = compose(applyMiddleware(thunk));
export let store = createStore(persistedReducer, enhancer);
export let persistor = persistStore(store)

