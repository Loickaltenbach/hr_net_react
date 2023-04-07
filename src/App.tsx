import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ErrorScreen from './pages/errorScreen'
import CreationScreen from './pages/creationScreen'
import EmployeesScreen from './pages/employeesScreen';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CreationScreen />} />
            <Route path='/employees' element={<EmployeesScreen />} />
            <Route path='/*' element={<ErrorScreen />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App