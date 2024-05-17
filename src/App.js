// import React from 'react';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import { Provider, useSelector } from 'react-redux';
// import store from './store';
// import './App.css'; // Import CSS file

// const ShareButton = () => {
//   const tasks = useSelector((state) => state.tasks);

//   const generateShareLink = () => {
//     const taskTexts = tasks.map(task => task.text).join('\n');
//     const encodedText = encodeURIComponent(`Here are my tasks:\n${taskTexts}`);
//     return `https://wa.me/?text=${encodedText}`;
//   };

//   const handleCopyLink = () => {
//     const shareLink = generateShareLink();
//     navigator.clipboard.writeText(shareLink).then(() => {
//       alert('Link copied to clipboard!');
//     });
//   };

//   const handleShareLink = () => {
//     const shareLink = generateShareLink();
//     window.open(shareLink, '_blank');
//   };

//   return (
//     <div className="share-container">
//       <button className="share-btn" onClick={handleCopyLink}>Copy Link</button>
//       <button className="share-btn" onClick={handleShareLink}>Share on WhatsApp</button>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="container">
//         <h1>My To-Do Application</h1>
//         <TaskInput />
//         <TaskList />
//         <ShareButton />
//         <footer>&copy; 2024 Md Kaish. All rights reserved.</footer>
//       </div>
//     </Provider>
//   );
// }

// export default App;

// 2nd
// import React from 'react';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import { Provider, useSelector } from 'react-redux';
// import store from './store';
// import jsPDF from 'jspdf'; // Import jsPDF library
// import './App.css'; // Import CSS file

// const ShareButton = () => {
//   const tasks = useSelector((state) => state.tasks);

//   const generateShareLink = () => {
//     const taskTexts = tasks.map(task => task.text).join('\n');
//     const encodedText = encodeURIComponent(`Here are my tasks:\n${taskTexts}`);
//     return `https://wa.me/?text=${encodedText}`;
//   };

//   const handleCopyLink = () => {
//     const shareLink = generateShareLink();
//     navigator.clipboard.writeText(shareLink).then(() => {
//       alert('Link copied to clipboard!');
//     });
//   };

//   const handleShareLink = () => {
//     const shareLink = generateShareLink();
//     window.open(shareLink, '_blank');
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text("My To-Do Tasks", 10, 10);
//     tasks.forEach((task, index) => {
//       doc.text(`${index + 1}. ${task.text}`, 10, 20 + (index * 10));
//     });
//     doc.save("tasks.pdf");
//   };

//   return (
//     <div className="share-container">
//       <button className="share-btn" onClick={handleCopyLink}>Copy Link</button>
//       <button className="share-btn" onClick={handleShareLink}>Share on WhatsApp</button>
//       <button className="download-btn" onClick={generatePDF}>Download PDF</button>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="container">
//         <h1>My To-Do Application</h1>
//         <TaskInput />
//         <TaskList />
//         <ShareButton />
//         <footer>&copy; 2024 Md Kaish. All rights reserved.</footer>
//       </div>
//     </Provider>
//   );
// }

// export default App;

// 3rd

// import React from 'react';
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';
// import { Provider, useSelector } from 'react-redux';
// import store from './store';
// import jsPDF from 'jspdf'; // Import jsPDF library
// import './App.css'; // Import CSS file

// const ShareButton = () => {
//   const tasks = useSelector((state) => state.tasks);

//   const generateShareLink = () => {
//     const taskTexts = tasks.map(task => task.text).join('\n');
//     const baseUrl = window.location.href.split('?')[0];
//     const encodedTasks = encodeURIComponent(JSON.stringify`Here are my tasks:\n${taskTexts}`);
//     return `${baseUrl}?tasks=${encodedTasks}`;
//   };

//   const handleCopyLink = () => {
//     const shareLink = generateShareLink();
//     navigator.clipboard.writeText(shareLink).then(() => {
//       alert('Link copied to clipboard!');
//     });
//   };

//   const handleShareLink = () => {
//     generatePDF(); // Generate PDF before sharing
//     const shareLink = generateShareLink();
//     window.open(shareLink, '_blank');
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text("My To-Do Tasks", 10, 10);
//     tasks.forEach((task, index) => {
//       doc.text(`${index + 1}. ${task.text}`, 10, 20 + (index * 10));
//     });
//     doc.save("tasks.pdf");
//   };

//   return (
//     <div className="share-container">
//       <button className="share-btn" onClick={handleCopyLink}>Copy Link</button>
//       <button className="share-btn" onClick={handleShareLink}>Share on WhatsApp</button>
//       <button className="download-btn" onClick={generatePDF}>Download PDF</button>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="container">
//         <h1>My To-Do Application</h1>
//         <TaskInput />
//         <TaskList />
//         <ShareButton />
//         <footer>&copy; 2024 Md Kaish. All rights reserved.</footer>
//       </div>
//     </Provider>
//   );
// }

// export default App;

// 4th
import React, { useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { addTask } from './components/TaskAction';
import jsPDF from 'jspdf';
import './App.css'; // Import CSS file

const ShareButton = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const generateShareLink = () => {
    const baseUrl = window.location.href.split('?')[0];
    return `${baseUrl}tasks.pdf`;
  };

  const handleShareLink = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before sharing.'); // Show alert if no tasks
    } else {
      const shareLink = generateShareLink();
      window.open(shareLink, '_blank');
    }
  };

  const generatePDF = () => {
    if (tasks.length === 0) {
      alert('Please add tasks to the list before downloading...'); // Show alert if no tasks
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tasksParam = urlParams.get('tasks');
    if (tasksParam) {
      const taskTexts = JSON.parse(decodeURIComponent(tasksParam));
      taskTexts.forEach(text => dispatch(addTask(text)));
    }
  }, [dispatch]);

  return (
    <div className="share-container">
      <button className="share-btn" onClick={handleShareLink}>Share on WhatsApp</button>
      <button className="download-btn" onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

const App = () => {
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