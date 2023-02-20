import "./App.css";
import React, { useState, useEffect } from "react";
import { Forecast } from "./components/index";
import { Search } from "./components/index";
import { weatherAPIKey, weatherAPI, geoIPLocation } from "./components/api";

function App() {
  const [data, setData] = useState(null);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    const result = fetch(`${geoIPLocation}`, { method: "get" })
      .then((response) => response.json())
      .then((data) => {
        return fetch(
          `${weatherAPI}/forecast.json?key=${weatherAPIKey}&q=${
            data.city.split(" ")[0]
          }&days=7&aqi=yes`,
          { method: "get" }
        );
        //return fetch(`${weatherAPI}/current.json?key=${weatherAPIKey}&q=${data.latitude},${data.longitude}&aqi=yes`,{ method: "get" });
      })
      .then((response) => response.json())
      .catch((err) => {
        console.error("Request failed", err);
      });

    result.then((r) => {
      setData(r);
      setDataIsLoaded(true);
    });
  }, []);
  const handleOnSearchChange = (searchData) => {
    const cities = searchData.target;
    

    if ("longitude" in cities.dataset && "latitude" in cities.dataset) {
      const result = fetch(
        `${weatherAPI}/forecast.json?key=${weatherAPIKey}&q=${cities.dataset.latitude},${cities.dataset.longitude}&days=7&aqi=yes`,
        { method: "get" }
      ).then((response) => response.json());
      result.then((r) => {
        setData(r);
        setDataIsLoaded(true);
      });
    }
  };

  return (
    <div className="main-container">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex-[0_0_100%] mt-10 lg:w-2/5">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
        <div className="w-4/5 mt-10">
          <Forecast data={data} dataIsLoaded={dataIsLoaded} />
        </div>
      </div>
    </div>
  );
}

export default App;
