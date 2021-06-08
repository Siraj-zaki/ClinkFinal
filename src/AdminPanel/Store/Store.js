import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer'
import globalReducer from './reducers/globalReducer'
import appReducer from './reducers/appReducer'
import cartReducer from './reducers/cartReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    authReducer,
    appReducer,
    cartReducer,
    globalReducer
})


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['globalReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)

const store1 = { store, persistor }
export default store1;