"use client";

import { raleway } from "@/app/fonts";
import React, { useState } from "react";

const GetDate = () => {
  function getdateformatted() {
    var days = [
      "Sundaay",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date: any = new Date();

    let day_name: string = days[date.getDay()];
    let todays_date: number = date.getDate();
    let month: string = months[date.getMonth()];

    return `${day_name}, ${todays_date} ${month}`;
  }
  const [date, setDate] = useState(getdateformatted());

  // I didn't have useEffect before in this component, hence it was never triggering a re-render !
  React.useEffect(() => {
    setDate(getdateformatted());
  }, []);

  return (
    <h1 className={`mt-2 text-2xl ${raleway.className} font-normal`}>{date}</h1>
  );
};

export default GetDate;
