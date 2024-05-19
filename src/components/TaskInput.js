import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../components/TaskAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      dispatch(addTask(task));
      setTask('');
    } else {
      alert('Please enter a valid task...');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="add-task-btn">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TaskInput;
