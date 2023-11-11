import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Login, SignUp, DashBoard } from "./Components";
import { store } from "./app/store";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
