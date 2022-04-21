import React from "react";
import { CountryProvider } from "./context/CountryContext";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <>
      <CountryProvider>
        <Routes>
          <Route exact path="/" element={<Countries/>}/>
          <Route exact path="/country/:countryName" element={<Country/>}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </CountryProvider>
    </>
  );
};

export default App;
