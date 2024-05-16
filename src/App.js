
import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import store from './store';
import './App.css'; // Import CSS file

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>My To-Do Application</h1>
        <TaskInput />
        <TaskList />
      </div>
    </Provider>
    
  );
}

export default App;