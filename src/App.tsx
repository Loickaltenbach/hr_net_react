import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorScreen from "./pages/errorScreen";
import CreationScreen from "./pages/creationScreen";
import EmployeesScreen from "./pages/employeesScreen";
import store from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CreationScreen />} />
              <Route path="/employees" element={<EmployeesScreen />} />
              <Route path="/*" element={<ErrorScreen />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
