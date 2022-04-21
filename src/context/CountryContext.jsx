import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [showButton, setShowButton] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selector, setSelector] = useState(true);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(12);
  const [country, setCountry] = useState([]);
  const { countryName } = useParams();
  const [input, setInput] = useState("");

  return (
    <>
      <div>
        <CountryContext.Provider
          value={{
            showButton,
            setShowButton,
            countries,
            setCountries,
            loading,
            setLoading,
            error,
            setError,
            selector,
            setSelector,
            modal,
            setModal,
            visible,
            setVisible,
            country,
            setCountry,
            countryName,
            input,
            setInput,
          }}
        >
          {children}
        </CountryContext.Provider>
      </div>
    </>
  );
};
