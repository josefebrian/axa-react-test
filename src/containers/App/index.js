import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import route modules
const MainRoutes = lazy(() => import('./MainRoutes'));

function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route exact path="/*" element={<MainRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
