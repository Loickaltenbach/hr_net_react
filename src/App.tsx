import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ErrorScreen from './pages/errorScreen'
import CreationScreen from './pages/creationScreen'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreationScreen />} />
          <Route path='/*' element={<ErrorScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App