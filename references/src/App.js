import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Nav from './components/nav.jsx';
import Main from './components/main.jsx'
import Study from "./components/study";
import Map from './components/map.jsx';
import Moder from './components/moder.jsx';
import Finance from './components/financial_assistance.jsx';
import './App.css';
import './main.css';
import './nav.css';
import './study.css';
import './map.css'
import './login.css'
import './moder.css'
import './fin.css'

function App() {
  
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/financial_assistance" element={<Finance/>} />
        <Route path="/references" element={<Study />} />
        <Route path="/map" element={< Map/>}/>
        <Route path="/moder" element={< Moder/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
