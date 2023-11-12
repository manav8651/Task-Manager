import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Login, SignUp, DashBoard } from "./Components";
import { store } from "./app/store";
import { Provider } from "react-redux";
import RequireAuth from "./Components/RequireAuth";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Wrapping Dashboard with Require Auth
        This will prohibit unauthorized entry to the dashboard */}
        <Route element={<RequireAuth />} >
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
