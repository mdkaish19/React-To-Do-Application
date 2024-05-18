// src/reducers/taskReducer.js
const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = action.payload;
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    case 'DELETE_TASK':
      const deletedId = action.payload;
      const filteredTasks = state.tasks.filter((task) => task.id !== deletedId);
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return {
        ...state,
        tasks: filteredTasks,
      };
    case 'UPDATE_TASK':
      const { id, updatedText } = action.payload;
      const updatedTasksList = state.tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasksList));
      return {
        ...state,
        tasks: updatedTasksList,
      };
    case 'CLEAR_TASKS':
      localStorage.removeItem('tasks');
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export default taskReducer;

