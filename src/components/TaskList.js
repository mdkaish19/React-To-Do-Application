// TaskList.js
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../components/TaskAction'; // Assuming you have an updateTask action

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [updatedText, setUpdatedText] = useState('');
  const [isEditing, setIsEditing] = useState(null); // State to track if editing is enabled for a task
  const inputRef = useRef(null); // Ref for the input element
  const [checkedTasks, setCheckedTasks] = useState(() => {
    // Initialize checked tasks from localStorage or empty array
    const storedCheckedTasks = localStorage.getItem('checkedTasks');
    return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : [];
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task...?');
    if (confirmDelete) {
      dispatch(deleteTask(id));
      setCheckedTasks(checkedTasks.filter(taskId => taskId !== id)); // Remove deleted task from checkedTasks
    }
  };

  const handleUpdate = (task) => {
    if (updatedText.trim() !== '') {
      dispatch(updateTask(task.id, updatedText));
      setUpdatedText(''); // Clear the input after update
      setIsEditing(null); // Disable editing after update
    }
  };

  const handleEditClick = (task) => {
    setUpdatedText(task.text); // Set the updatedText state with the current task's text
    setIsEditing(task.id); // Enable editing for this task
  };

  const handleKeyPress = (event, task) => {
    if (event.key === 'Enter') {
      handleUpdate(task); // Call handleUpdate when Enter key is pressed
    }
  };

  useEffect(() => {
    if (inputRef.current && isEditing !== null) {
      inputRef.current.focus(); // Focus on the input when isEditing is not null
    }
  }, [isEditing]);

  const handleCheckboxChange = (taskId) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter(id => id !== taskId)); // Remove task from checkedTasks if unchecked
    } else {
      setCheckedTasks([...checkedTasks, taskId]); // Add task to checkedTasks if checked
    }
  };

  useEffect(() => {
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks)); // Update localStorage when checkedTasks change
  }, [checkedTasks]);

  const activeTasks = tasks.filter(task => !checkedTasks.includes(task.id));
  const completedTasks = tasks.filter(task => checkedTasks.includes(task.id));

  return (
    <div className="task-list-container">
      <div className="active-tasks">
        <h2>Tasks List</h2>
        <ul>
          {activeTasks.map((task, index) => ( // Added 'index' for numbering
            <li key={task.id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={checkedTasks.includes(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                <span className="checkbox-custom"></span>
              </label>
              <span className="item-number">{index + 1}.</span> {/* Item number with spacing */}
              {isEditing === task.id ? (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, task)}
                    placeholder="Enter updated task"
                  />
                  <button className="save-btn" onClick={() => handleUpdate(task)}>Save</button>
                </>
              ) : (
                <>
                  <span className="item-text">{task.text}</span> {/* Item text with spacing */}
                  <button className="update-btn" onClick={() => handleEditClick(task)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="completed-tasks">
        <h2>Completed Tasks</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={task.id}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={checkedTasks.includes(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                <span className="checkbox-custom"></span>
              </label>
              <span className="item-number">{index + 1}.</span> {/* Item number with spacing */}
              <span className="item-text">{task.text}</span>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
