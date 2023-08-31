"use client";

import { raleway } from "@/app/fonts";
import React, { useState } from "react";

const GetDate = () => {
  function getdateformatted() {
    var days = [
      "Sunday",
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

  React.useEffect(() => {
    setDate(getdateformatted());
  }, []);

  return (
    <h1
      className={`mt-2 text-2xl ${raleway.className} font-normal`}
      suppressHydrationWarning
    >
      {date}
    </h1>
  );
};

export const getGreeting = () => {
  var today: any = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export default GetDate;
