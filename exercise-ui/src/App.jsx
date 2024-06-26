import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';
import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>

        <header>
          <h1>Exercise PR Tracker &#128170;</h1>
          <p>Find your personal records below and add new ones!</p>
          <Navigation />
        </header>

        <Routes>
          <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
          <Route path='/edit-exercise' element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
          <Route path='/create-exercise' element={<CreateExercisePage/>}/>
        </Routes>
    
        <footer>
          A full-stack MERN demo &copy; 2022 Eric Bartanen
        </footer>

      </Router>
    </div>
  );
}

export default App;
