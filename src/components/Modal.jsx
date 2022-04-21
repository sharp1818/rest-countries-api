import React, { useContext } from "react";
import { CountryContext } from "../context/CountryContext";
import styled from "styled-components";

const Container = styled.div`
  z-index: 101;
  position: fixed;
  overflow-y: auto;
  opacity: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  .button-close {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    border: 1px solid var(--color-red);
    color: var(--color-green);
    background-color: var(--color-white);
    user-select: none;
  }
`;

const Modal = () => {
  const { error, setModal } = useContext(CountryContext);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <Container>
        {error}{" "}
        <button className="button-close" onClick={closeModal}>
          cerrar
        </button>
      </Container>
    </>
  );
};

export default Modal;
