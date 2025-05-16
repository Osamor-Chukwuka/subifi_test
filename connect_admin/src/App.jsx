import {React, useState } from 'react'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import JobsCreatedCard from './screens/JobsCreatedCard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Assignments from './screens/Assignments';
import Subscription from './screens/Subscription';
import Lookups from './screens/Lookups';
import AssignmentDetails from './screens/AssignmentDetails';
import DisputePage from './screens/DisputePage';
import DisputeHistory from './screens/DisputeHistory';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/assignments" element={<Assignments/>} />
          <Route path="/assignment/details" element={<AssignmentDetails />} />
          <Route path="/dispute" element={<DisputePage/>} />
          <Route path="/settings/subscription" element={<Subscription/>} />
          <Route path="/settings/lookups" element={<Lookups/>} />
          <Route path="/dispute-history" element={<DisputeHistory/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
