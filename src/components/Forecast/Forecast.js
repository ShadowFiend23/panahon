import React, { useState, useEffect } from "react";
import "./forecast.css";

const Forecast = ({ data, dataIsLoaded }) => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  console.log(data);

  

  const btnClick = (e) => {
    const dayForecast = document.getElementById(e.target.dataset.id);
    const forecastBtn = document.querySelectorAll(".frctBtn");

    forecastBtn.forEach((e) => {
      e.classList.remove("active");
    });

    const forecastInfo = document.querySelectorAll(".forecastInfo");

    forecastInfo.forEach((e) => {
      e.classList.add("hidden");
    });

    dayForecast.classList.remove("hidden");
    dayForecast.classList.add("fade-in");

    document.getElementById(e.target.id).classList.add("active");
  };

  const dayInWeek = new Date().getDay();
  let forecastDays = weekDays.slice(0, weekDays.length - 1);

  if (dayInWeek) {
    forecastDays = weekDays
      .slice(dayInWeek, weekDays.length)
      .concat(weekDays.slice(0, dayInWeek - 1));
  }
  const show =
    "forecastInfo card-morph border border-blue-300 shadow rounded-md p-4 max-w-2xl w-full mx-auto fade-in";
  const hidden = show + " hidden";
  const list = [];
  const listClass = "frctBtn py-3 px-5 rounded-3xl";
  const listActive = listClass + " active";

  let column = [];

  for (let i = 0; i < 6; i++) {
    column.push(
      <div className={i === 0 ? show : hidden} key={i}>
        <div className=" animate-pulse grid grid-cols-2 gap-2">
          <div className="items-center w-full">
            <span className="bg-slate-200 h-2 block rounded"></span>
            <span className="bg-slate-200 h-2 block mt-2 rounded"></span>
          </div>
          <div className="flex currentIcon">
            <div className="rounded-full bg-slate-200 h-10 w-10 absolute"></div>
          </div>
          <div className="flex items-center">
            <h3 className="curTemp bg-slate-200 h-[100px] w-[170px] rounded">
              {" "}
            </h3>
          </div>
          <div className="block p-3 details">
            <h6 className="bg-slate-200 h-2 block rounded"> </h6>
            <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
            <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
            <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
            <h4 className="bg-slate-200 h-2 block mt-2 rounded"> </h4>
          </div>
        </div>
      </div>
    );
  }

  for (let i = 0; i < forecastDays.length; i++) {
    list.push(
      <li className="mt-4 forecastDaysBtn" key={i} onClick={btnClick}>
        <button
          className={i === 0 ? listActive : listClass}
          id={"frctBtn" + i}
          data-id={forecastDays[i]}
        >
          {forecastDays[i]}
        </button>
      </li>
    );
  }
  if (!dataIsLoaded) {
    return (
      <section>
        <div className="card-morph border border-blue-300 shadow rounded-md p-4 max-w-md w-full mx-auto">
          <div className=" animate-pulse grid grid-cols-2 gap-2">
            <div className="items-center w-full">
              <span className="bg-slate-200 h-2 block rounded"></span>
              <span className="bg-slate-200 h-2 block mt-2 rounded"></span>
            </div>
            <div className="flex currentIcon">
              <div className="rounded-full bg-slate-200 h-10 w-10 absolute"></div>
            </div>
            <div className="flex items-center">
              <h3 className="curTemp bg-slate-200 h-[100px] w-[170px] rounded">
                {" "}
              </h3>
            </div>
            <div className="block p-3 details">
              <h6 className="bg-slate-200 h-2 block rounded"> </h6>
              <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
              <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
              <h6 className="bg-slate-200 h-2 block mt-2 rounded"> </h6>
              <h4 className="bg-slate-200 h-2 block mt-2 rounded"> </h4>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 pt-10">{column}</div>
      </section>
    );
  } else {
    let values = data.forecast.forecastday;
    column = [];
    for (let i = 1; i < values.length; i++) {
      column.push(
        <div
          className={i === 1 ? show : hidden}
          id={forecastDays[i - 1]}
          key={i}
        >
          <div className="flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-2">
            <div className="flex-[50%] w-full">
              <span className="block capitalize">
                <b>{values[i].day.condition.text}</b>
              </span>
            </div>
            <div className="flex-[50%] flex currentIcon">
              <img
                className="absolute"
                src={values[i].day.condition.icon}
                alt="condition"
              />
            </div>
            <div className="flex-[100%] w-full lg:flex lg:items-center">
              <h3 className="curTemp items-center mt-6">
                {values[i].day.avgtemp_c}°C
              </h3>
            </div>
            <div className="flex-[100%] block p-3 details">
              <h4>Details</h4>
              <h6>
                Feels Like -<span>{values[i].day.feelslike_c}°C</span>
              </h6>
              <h6>
                Wind -<span>{values[i].day.wind_kph} kph</span>
              </h6>items
              <h6>
                Humidity - <span>{values[i].day.avghumidity}%</span>
              </h6>
              <h6>
                Pressure - <span>{values[i].day.pressure_in} hPa</span>
              </h6>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <section>
      <div className="card-morph border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-2">
          <div className="flex-[50%] w-full">
            <span className="block capitalize">
              <b>
                {data.location.name}, {data.location.country}
              </b>
            </span>
            <span className="block capitalize">
              {data.current.condition.text}
            </span>
          </div>
          <div className="flex-[50%] flex currentIcon">
            <img
              className="absolute"
              src={data.current.condition.icon}
              alt="condition"
            />
          </div>
          <div className="flex-[100%] w-full lg:flex lg:items-center">
            <h3 className="text-center curTemp">{data.current.temp_c}°C</h3>
          </div>
          <div className="flex-[100%] block p-3 details">
            <h4>Details</h4>
            <h6>
              Feels Like -<span>{data.current.feelslike_c}°C</span>
            </h6>
            <h6>
              Wind -<span>{data.current.wind_kph} kph</span>
            </h6>
            <h6>
              Humidity - <span>{data.current.humidity}%</span>
            </h6>
            <h6>
              Pressure - <span>{data.current.pressure_in} hPa</span>
            </h6>
          </div>
        </div>
      </div>

      <nav className="overflow-x-scroll lg:overflow-x-hidden lg:px-40">
        <ul className="forecastDays inline-flex lg:flex lg:justify-evenly">
          {list}
        </ul>
      </nav>
      <div className="flex justify-center pt-10 relative">{column}</div>
    </section>
  );
};

export default Forecast;
