import React, { useContext } from "react";
import { CountryContext } from "../context/CountryContext";
import styled from "styled-components";
import { breakpoints } from "../styles/MediaQueries";

const Input = styled.input`
  outline: none;
  border: none;
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: 14px;
  width: 140px;
  padding: 12px 6px;
  ${breakpoints.phone} {
    width: 200px;
  }
  ${breakpoints.tablet} {
    width: 350px;
  }
`;

const SearchInput = ({ onSearch }) => {
  const { input, setInput } = useContext(CountryContext);

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(input);
    setInput("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          placeholder="Busca un País"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchInput;
