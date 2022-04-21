import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../styles/MediaQueries";

const Error = styled.div`
max-width: 800px;
margin: 0 auto;
padding: 40px;
.button-close {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    border: 1px solid var(--color-red);
    color: var(--color-green);
    background-color: var(--color-white);
    user-select: none;
    a{
        width: 100%;
        height: 100%;
        color: var(--color-green);
        text-decoration: none;
    }
  }
.message{
    color: var(--color-white)
}
`

const Error404 = () => {
  return (
    <>
    <Error>
      <button className="button-close">
        <Link to="/">Volver</Link>
      </button>
      <div className="message">Lo sentimos, no podemos acceder a esa ruta</div>
    </Error>
    </>
  );
};

export default Error404;
