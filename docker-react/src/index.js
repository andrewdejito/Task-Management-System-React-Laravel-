import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './tasks/App';
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
// import TaskEdit from './tasks/TaskEdit'; // (optional if you add edit feature later)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Main task routes */}
        <Route path="/" element={<App />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
        {/* <Route path="/edit-task/:id" element={<TaskEdit />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
