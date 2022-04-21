import React, { useContext } from "react";
import { CountryContext } from "../context/CountryContext";
import styled from "styled-components";

const Button = styled.div`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: 1px solid var(--color-red);
  color: var(--color-green);
  background-color: var(--color-white);
  user-select: none;
`

const ButtonShowMore = () => {
  const { setVisible } = useContext(CountryContext);

  const showMoreCountries = () => {
    setVisible((prevValue) => prevValue + 12);
  };

  return (
    <>
      <Button onClick={showMoreCountries}>Ver más países</Button>
    </>
  );
};

export default ButtonShowMore;
