export const addTask = (text) => ({
    type: 'ADD_TASK',
    payload: {
      id: Math.random(),
      text,
    },
  });
  
  export const deleteTask = (id) => ({
    type: 'DELETE_TASK',
    payload: id,
  });
  