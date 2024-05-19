import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store';
import jsPDF from 'jspdf'; // Import jsPDF library
import { clearTasks } from './components/TaskAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faDownload, faTrashAlt, faShare } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Import CSS file

const ShareButton = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const generateShareText = () => {
    return tasks.map((task, index) => `${index + 1}. ${task.text}`).join('\n');
  };

  const generateShareLink = () => {
    const taskList = generateShareText();
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

  const handleShareToOtherApps = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before sharing...');
    } else {
      const shareText = generateShareText();
      if (navigator.share) {
        navigator.share({
          title: 'My To-Do Tasks',
          text: `Here are my tasks List:\n${shareText}`
        }).catch((error) => console.log('Error sharing', error));
      } else {
        alert('Web Share API is not supported in your browser...');
      }
    }
  };

  const generatePDF = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before downloading...');
    } else {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text("My To-Do Tasks", 10, 10);
      tasks.forEach((task, index) => {
        doc.text(`${index + 1}. ${task.text}`, 10, 20 + (index * 10));
      });
      doc.save("tasks.pdf");
    }
  };

  const handleClearTasks = () => {
    if (tasks.length === 0) {
      alert('There are no tasks to clear...');
    } else if (window.confirm('Are you sure you want to clear all tasks...?')) {
      dispatch(clearTasks());
    }
  };

  return (
    <div className="share-container">
      <button className="share-other-btn" onClick={handleShareToOtherApps}>
        <FontAwesomeIcon icon={faShare} /> {/* Share to Other Apps Icon */}
      </button>
      <button className="share-btn" onClick={handleShareLink}>
        <FontAwesomeIcon icon={faShareAlt} /> {/* Share on WhatsApp Icon */}
      </button>
      <button className="download-btn" onClick={generatePDF}>
        <FontAwesomeIcon icon={faDownload} /> {/* Download Icon */}
      </button>
      <button className="clear-btn" onClick={handleClearTasks}>
        <FontAwesomeIcon icon={faTrashAlt} /> {/* Clear All Tasks Icon */}
      </button>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>My To-Do Lists</h1>
        <TaskInput />
        <TaskList />
        <ShareButton />
        <footer>&copy; 2024 Md Kaish. All rights reserved.</footer>
      </div>
    </Provider>
  );
}

export default App;
