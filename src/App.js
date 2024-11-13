// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,createBrowserRouter, RouterProvider } from 'react-router-dom';
import TaskList from './component/TaskList';
import TaskDetails from './component/TaskDetails';
import Login from './component/Login';
import combinedRoutes from './routers/combinedRoutes';
// import './styles/App.css';
import './component/style.css';

function App() {
  return (
    <RouterProvider
    router={combinedRoutes}
    />
  );
}

export default App;
