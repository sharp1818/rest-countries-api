import React, { useContext, useEffect } from "react";
import { CountryContext } from "../context/CountryContext";
import { API_URL } from "../util/api";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../styles/MediaQueries";
import SearchInput from "./SearchInput";
import SelectFilter from "./SelectFilter";
import Modal from "./Modal";
import ButtonShowMore from "./ButtonShowMore";

const Header = styled.header`
  position: relative;
  height: 400px;
  user-select: none;
  .header-contain {
    color: white;
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .header-data {
      padding: 0 16px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      .header-data-mini-title {
        font-weight: 600;
        font-size: 18px;
        text-transform: uppercase;
        color: var(--color-red);
      }
      .header-data-title {
        color: #fff;
        font-size: 64px;
        font-weight: 200;
        margin-bottom: 8px;
        span{
            font-weight: 600;
        }
      }
      a{
          text-decoration: none;
          color: var(--color-white);
          background-color: var(--color-red);
          padding: 8px;
          border-radius: 8px;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  .top {
    padding: 30px 4px 40px 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .mid {
    color: var(--color-white);
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 40px;
    ${breakpoints.phone} {
      grid-template-columns: repeat(2, 1fr);
    }
    ${breakpoints.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
    ${breakpoints.desktop} {
      grid-template-columns: repeat(4, 1fr);
    }
    a {
      text-decoration: none;
      color: var(--color-white);
      
    }
    .card {
      background-color: var(--color-black);
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
      display: flex;
      flex-direction: column;
      padding: 0px 20px;
      border-radius: 20px;
      .title {
        padding: 10px 0px;
        text-transform: uppercase;
        width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .image img {
        width: 240px;
        height: 140px;
      }
      .data {
        padding: 8px 0px 20px 0px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    padding: 32px 4px;
  }
`;

const Countries = () => {
  const {
    countries,
    setCountries,
    loading,
    setLoading,
    error,
    setError,
    selector,
    modal,
    setModal,
    visible,
    showButton,
    setShowButton,
  } = useContext(CountryContext);

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${API_URL}/all`);
      if (!res.ok) throw new Error("Ocurrio un error");
      const data = await res.json();
      console.log(data);
      setCountries(data);
      setLoading(false);
      setShowButton(true);
    } catch (error) {
      setLoading(false);
      setModal(true);
      setError(error.message);
      setShowButton(true);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${API_URL}/name/${countryName}`);
      if (!res.ok) throw new Error("No se encontró el país");
      const data = await res.json();
      console.log(data);
      setCountries(data);
      setLoading(false);
      setShowButton(false);
    } catch (error) {
      setLoading(false);
      setModal(true);
      setError(error.message);
    }
  };

  const getCountryByCurrency = async (currencyName) => {
    try {
      const res = await fetch(`${API_URL}/currency/${currencyName}`);
      if (!res.ok) throw new Error("No se encontró la moneda");
      const data = await res.json();
      console.log(res);
      setCountries(data);
      setLoading(false);
      setShowButton(false);
    } catch (error) {
      setLoading(false);
      setModal(true);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <>
      <Header>
        <img src={require("../images/1.jpg")} />
        <div className="header-contain">
          <div className="header-data">
            <div className="header-data-mini-title">Rest Countries</div>
            <div className="header-data-title"><span>Rest</span>Countries</div>
            <a href="#menu" >Busca un País</a>
          </div>
        </div>
      </Header>
      <Container id="menu">
        <div className="top">
          <SearchInput
            onSearch={selector ? getCountryByName : getCountryByCurrency}
          />
          <SelectFilter />
        </div>

        <div className="mid">
          {loading && !error && <h4>Cargando...</h4>}
          {error && !loading && modal && <Modal />}

          {countries.slice(0, visible).map((country) => (
            <Link
              to={`/country/${country.name.common}`}
              key={country.name.common}
            >
              <div className="card">
                <div className="title">
                  <h3>{country.name.common}</h3>
                </div>
                <div className="image">
                  <img src={country.flags.png} alt="" />
                </div>
                <div className="data">
                  <h5>Continente: {country.continents}</h5>
                  <h5>Capital: {country.capital}</h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="bottom">{showButton && <ButtonShowMore />}</div>
      </Container>
    </>
  );
};

export default Countries;
