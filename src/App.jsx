// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Entrypage from './Components/EntryPage';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Contact from './Components/Contact';
import Analytics from './Components/Analytics';
import Chatbot from './Components/Chatbot';
import Team from './Components/Team';
import Settings from './Components/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrypage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<Contact />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ticket/:id" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

//  Made with ❤️ by
//  Aditya Mohite
//  adityamohite4973@gmail.com