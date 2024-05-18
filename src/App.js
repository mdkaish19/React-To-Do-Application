// 2nd
import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import jsPDF from 'jspdf'; // Import jsPDF library
import { clearTasks } from './components/TaskAction';
import './App.css'; // Import CSS file

const ShareButton = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const checkedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || [];

  const activeTasks = tasks.filter(task => !checkedTasks.includes(task.id));
  const completedTasks = tasks.filter(task => checkedTasks.includes(task.id));

  const generateShareLink = () => {
    const taskList = tasks.map((task, index) => `${index + 1}. ${task.text}`).join('\n');
    const encodedText = encodeURIComponent(`Here are my tasks List:\n${taskList}`);
    return `https://wa.me/?text=${encodedText}`;
  };

  const handleShareLink = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before sharing...');
    } else {
      const shareLink = generateShareLink();
      window.open(shareLink, '_blank');
    }
  };

  const generatePDF = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before downloading...');
    } else {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text("My To-Do Tasks", 10, 10);

      doc.text("Active Tasks:", 10, 20);
      activeTasks.forEach((task, index) => {
        doc.text(`${index + 1}. ${task.text}`, 10, 30 + (index * 10));
      });

      doc.text("Completed Tasks:", 10, 40 + (activeTasks.length * 10));
      completedTasks.forEach((task, index) => {
        doc.text(`${index + 1}. ${task.text}`, 10, 50 + (activeTasks.length * 10) + (index * 10));
      });

      doc.save("tasks.pdf");
    }
  };

  const handleClearTasks = () => {
    if (tasks.length === 0) {
      alert('There are no tasks to clear...');
    } else if (window.confirm('Are you sure you want to clear all tasks...?')) {
      dispatch(clearTasks());
      localStorage.removeItem('checkedTasks');
    }
  };

  return (
    <div className="share-container">
      <button className="share-btn" onClick={handleShareLink}>Share on WhatsApp</button>
      <button className="download-btn" onClick={generatePDF}>Download PDF</button>
      <button className="clear-btn" onClick={handleClearTasks}>Clear All Tasks</button>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>My To-Do Application</h1>
        <TaskInput />
        <TaskList />
        <ShareButton />
        <footer>&copy; 2024 Md Kaish. All rights reserved.</footer>
      </div>
    </Provider>
  );
}

export default App;
