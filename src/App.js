import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add-task' element={<AddTask/>} />   
        <Route path='/update-task/:taskId' element={<UpdateTask/>} />    
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
