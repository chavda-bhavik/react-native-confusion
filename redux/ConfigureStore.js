import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

import { dishes } from "./dishes";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { leaders } from "./leaders.js";
import { favorites } from "./favorites";

export const configureStore = () => {
    const config = {
        key: 'root',
        storage: storage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            dishes, 
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk)
    );
    const persistor = persistStore(store);
    return { persistor, store }
}