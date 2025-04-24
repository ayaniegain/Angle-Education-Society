import React from "react";
import OfficialForm from "./components/OfficialForm";
import { Route, Routes } from "react-router";
import PaymentForm from "./components/PaymentForm";
import AdditionalDetails from "./components/AdditionalDetails";
import Header from "./components/Header";

import "./App.css"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<OfficialForm />} />
        <Route path={"/payment"} element={<AdditionalDetails />} />
        <Route path={"/additional"} element={<AdditionalDetails />} />
      </Routes>
    </>
  );
}

export default App;
