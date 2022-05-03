import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import CreateRace from './pages/CreateRace';
import Races from './pages/Races';
import RaceHorses from './pages/RaceHorses';
import RaceResults from './pages/RaceResults';
import AllResults from './pages/AllResults';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={<Races />}></Route>
          <Route path='/create' element={<CreateRace/>}></Route>
          <Route path='/horses' element={<RaceHorses />}></Route>
          <Route path='/raceresults' element={<RaceResults />}></Route>
          <Route path='/allresults' element={<AllResults />}></Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> 
      </div>
    </div>
  );
}

export default App;
