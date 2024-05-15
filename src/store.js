// src/store.js
import { createStore } from 'redux';
import rootReducer from './components/TaskReducer';

const store = createStore(rootReducer);

export default store;
