import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

const store = configureStore({
    reducer: {
        data: rootReducer
    }
})

export default store