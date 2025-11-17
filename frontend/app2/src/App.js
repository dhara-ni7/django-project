import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Screen/Home";
import Header from "./Components/Header";
import EditApplicant from "./Components/Screen/EditApplicant";
import Stats from "./Components/Screen/Stats";
import LoginScreen from "./Components/Screen/LoginScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route
          exact
          path="/editApplicant/:id"
          element={<EditApplicant />}
        ></Route>
      </Routes>
      <Routes>
        <Route exact path="/StatisticsCollection/" element={<Stats />}></Route>
      </Routes>
       <Routes>
        <Route exact path="/login/" element={<LoginScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
