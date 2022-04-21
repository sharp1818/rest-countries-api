import React, { useContext } from "react";
import { CountryContext } from "../context/CountryContext";
import styled from "styled-components";
import { breakpoints } from "../styles/MediaQueries";

const Select = styled.select`
  border: none;
  outline: none;
  background-color: var(--color-white);
  font-size: 14px;
  width: 140px;
  padding: 12px 6px;
  ${breakpoints.phone} {
    width: 200px;
  }
  ${breakpoints.tablet} {
    width: 350px;
  }
`

const SelectFilter = () => {
  const { setSelector } = useContext(CountryContext);

  const selectorHandler = (e) => {
    const filterName = e.target.value;
    switch (filterName) {
      case "1":
        setSelector(true);
        break;
      case "2":
        setSelector(false);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Select defaultValue={''} onChange={selectorHandler}>
        <option value="" disabled >
          Seleccione Busqueda
        </option>
        <option value="1">Buscar por Nombre</option>
        <option value="2">Buscar por Moneda</option>
      </Select>
    </>
  );
};

export default SelectFilter;
