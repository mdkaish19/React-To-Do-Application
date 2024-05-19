import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../components/TaskAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [updatedText, setUpdatedText] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const inputRef = useRef(null);
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks = localStorage.getItem('checkedTasks');
    return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : [];
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task...?');
    if (confirmDelete) {
      dispatch(deleteTask(id));
      setCheckedTasks(checkedTasks.filter(taskId => taskId !== id));
    }
  };

  const handleUpdate = (task) => {
    if (updatedText.trim() !== '') {
      dispatch(updateTask(task.id, updatedText));
      setUpdatedText('');
      setIsEditing(null);
    }
  };

  const handleEditClick = (task) => {
    setUpdatedText(task.text);
    setIsEditing(task.id);
  };

  const handleKeyPress = (event, task) => {
    if (event.key === 'Enter') {
      handleUpdate(task);
    }
  };

  useEffect(() => {
    if (inputRef.current && isEditing !== null) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleCheckboxChange = (taskId) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter(id => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  useEffect(() => {
    localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  const activeTasks = tasks.filter(task => !checkedTasks.includes(task.id));
  const completedTasks = tasks.filter(task => checkedTasks.includes(task.id));

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>Hey, you don't have any tasks. Add a task today...</p>
        </div>
      ) : (
        <>
          {activeTasks.length > 0 ? (
            <div className="active-tasks">
              <h2>Tasks List</h2>
              <ul>
                {activeTasks.map((task, index) => (
                  <li key={task.id}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={checkedTasks.includes(task.id)}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                      <span className="checkbox-custom"></span>
                    </label>
                    <span className="item-number">{index + 1}.</span>
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
                        <button className="save-btn" onClick={() => handleUpdate(task)}>
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="item-text">{task.text}</span>
                        <button className="update-btn" onClick={() => handleEditClick(task)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            completedTasks.length === tasks.length && (
              <div className="no-tasks-message">
                <p>All tasks are completed...!</p>
              </div>
            )
          )}
          {completedTasks.length > 0 && (
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
                    <span className="item-number">{index + 1}.</span>
                    <span className="item-text">{task.text}</span>
                    <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
