import React, { useContext, useEffect } from "react";
import { CountryContext } from "../context/CountryContext";
import { API_URL } from "../util/api";
import styled from "styled-components";
import { breakpoints } from "../styles/MediaQueries";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  gap: 60px;
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 0px;
  padding: 20px;
  .button-link {
    background-color: var;
    display: flex;
    width: 140px;
    a {
      width: 100%;
      text-decoration: none;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid var(--color-red);
      color: var(--color-green);
      background-color: var(--color-white);
      user-select: none;
    }
  }
  .info {
    background-color: var(--color-black);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    ${breakpoints.phone} {
      flex-direction: row;
    }
    .image img {
      width: 240px;
      height: 140px;
      ${breakpoints.phone} {
        width: 360px;
        height: 210px;
      }
    }
    .data {
    width: 240px;
      color: var(--color-white);
    }
  }
`;

const Country = () => {
  const { countryName } = useParams();

  const { country, setCountry, loading, setLoading, error, setError, } =
    useContext(CountryContext);

  const DeleteComponent = () =>{
      setCountry([])
  }  

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${API_URL}/name/${countryName}`);
        if (!res.ok) throw new Error("No se encontró el país");
        const data = await res.json();
        console.log(data);
        setCountry(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    getCountryByName();
  }, [countryName]);

  return (
    <>
      <Layout>
        <div onClick={DeleteComponent} className="button-link">
          <Link to="/">Atrás</Link>
        </div>
        {loading && !error && <h4>Cargando...</h4>}
        {country?.map((country) => (
          <div className="info" key={country.name.common}>
            <div className="image">
              <img src={country.flags.png} alt="" />
            </div>
            <div className="data">
              <h2>{country.name.common}</h2>
              <h4>Moneda:  {(Object.values((Object.values(Object.values(country.currencies))[0]))[0])}</h4>
              <h4>Continente: {country.continents}</h4>
              <h4>Lenguajes: {(Object.values(country.languages)).join(',')}</h4>
              <h4>Capital: {country.capital}</h4>
            </div>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Country;
