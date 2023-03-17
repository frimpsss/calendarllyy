import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { genetate, months } from "../utils/generateCalender.js";



const data  = localStorage.getItem("month")
const selectedLS = localStorage.getItem('selected')
export const Calender = () => {
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const[selected, setSelected] = useState(currentDate)
  useEffect(() => {
    if(data !== null){
        setToday(dayjs(data))
    }
  },[])

  useEffect(() => {
    if(selectedLS !== null){
        setSelected(dayjs(selectedLS))
    }
  },[])
  useEffect(() => {
    localStorage.setItem("selected", selected)
  }, [selected])

  useEffect(() => {
    localStorage.setItem("month", today)
  }, [today])

  

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="divide-x-2 w-[50%] gap-4 flex justify-center">
      <div className="w-1/2">
        <div className="flex justify-between">
          <h2 className="p-2 bg-gray-100 inline-block m-1 rounded">
            {months[today.month()]}, {today.year()}
          </h2>
          <div className="flex items-center gap-2">
            <Icon icon="ic:outline-navigate-next" width="30" className="cursor-pointer" rotate={2} onClick={() => {
                setToday(today.month(today.month() - 1))
            }}/>
            <h2 onClick={() => {
                setToday(currentDate)
            }} className="cursor-pointer">Today</h2>
            <Icon icon="ic:outline-navigate-next" width="30" className="cursor-pointer" onClick={() => {
                setToday(today.month(today.month() + 1))
            }}/>
          </div>
        </div>
        <div className={"grid grid-cols-7  border-t-2 p-3"}>
          {days.map((itm, inx) => {
            return (
              <h3 key={inx} className="font-bold p-4 ">
                {itm}
              </h3>
            );
          })}
          {genetate(today.month(), today.year()).map(({ date, today, currentMonth }, inx) => {
            return (
              <div
                key={inx}
                className={`p-4  ${
                  !currentMonth && "text-gray-400 font-light cursor-not-allowed"
                } ${today && "bg-red-600 text-white"} 

              ${
                currentMonth &&
                "hover:text-white hover:bg-black duration-700 cursor-pointer"
              }

            ${
                selected.toDate().toDateString() === date.toDate().toDateString() && "bg-black text-white"
                }
              `}

              onClick={() => {
                setSelected(date)
              }}
              >
                <p className="text-center">{date.date()}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" pl-4">
        <h5>Schedule for {selected .toDate().toDateString()}</h5>
        <p className="text-gray-500">No Meetings today</p>
      </div>
    </div>
  );
};
