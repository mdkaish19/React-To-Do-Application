import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../components/TaskAction'; // Assuming you have an updateTask action

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [updatedText, setUpdatedText] = useState('');
  const [isEditing, setIsEditing] = useState(null); // State to track if editing is enabled for a task
  const inputRef = useRef(null); // Ref for the input element

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      dispatch(deleteTask(id));
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

  return (
    <div className="container">
      <ul>
        {tasks.map((task, index) => ( // Added 'index' for numbering
          <li key={task.id}>
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
  );
};

export default TaskList;
