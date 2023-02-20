import React, { useState } from "react";
import { citiesOptions, citiesApi } from "../api";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  let options = "";

  const handleOnChange = (searchData) => {
    setLoading(true);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      fetchApi(searchData);
    }, 500);

    setTimer(newTimer);
  };

  function fetchApi(searchData) {
    fetch(`${citiesApi}namePrefix=${searchData.target.value}`, citiesOptions)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        setLoading(false);
        setSearch(searchData);
        onSearchChange(searchData);
      })
      .catch((err) => console.error(err));
  }

  if (data) {
    if ("data" in data) {
      options = data.data.map((val, i) => {
        return (
          <div
            className="cities"
            key={i}
            data-coordinates={`${val.latitude} ${val.longitude}`}
          >{`${val.city}, ${val.country}`}</div>
        );
      });
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center w-full relative">
        <input
          type="text"
          id="searchBox"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-2xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Location or City"
          onChange={handleOnChange}
        />
        <span id="close"></span>
        <div className="relative w-full" id="autoComplete">
          <div>
            <span className="loader"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center w-full relative">
      <input
        type="text"
        id="searchBox"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-2xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        placeholder="Location or City"
        onChange={(e) => handleOnChange(e)}
      />
      <span id="close"></span>
      <div className="relative w-full" id="autoComplete">
        {options}
      </div>
    </div>
  );
};

export default Search;
