import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../components/TaskAction';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {/* Use CSS for bullet points */}
            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>•</span>
            <span style={{ marginRight: '8px' }}>{task.text}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
