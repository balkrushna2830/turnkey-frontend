import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import { isAuthenticated } from './Auth/Helper';
import Signin from './Auth/Signin';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard/Dashboard';
import DashboardContent from './Dashboard/DashboardContent';
import ImagesContent from './Dashboard/ImagesContent';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="" element={<DashboardContent />} />
            <Route path="Images" element={<ImagesContent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoutes = () => {
  const authenticated = isAuthenticated();
  return (
    authenticated ? <Outlet /> : <Navigate replace to="/" />
  )
}

const PublicRoutes = () => {
  const authenticated = isAuthenticated();
  return (
    !authenticated ? <Outlet /> : <Navigate replace to="/Dashboard" />
  )
}

export default App;
