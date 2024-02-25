import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [session, setSession] = useState(10);
  const [breakTime, setBreakTime] = useState(5);
  const [isStart, setStart] = useState(false);
  const [timerType, setTimerType] = useState(session);

  // First useEffect: to start the timer
  useEffect(() => {
    let pomodoro;

    if (isStart && session >= 0) {
      pomodoro = setInterval(() => {
        setSession((prevTime) => prevTime - 1);
      }, 1000);
      setTimerType(session);
      console.log(session);
      if (session <= 0) {
        let message = "The session is: " + session;
        console.log(message);
        console.log("The second useEffect is running");
      }
    } else if (isStart && session <= -1 && breakTime >= 0) {
      setTimerType(breakTime);
      console.log(breakTime);
      pomodoro = setInterval(() => {
        setBreakTime((prevTime) => prevTime - 1);
      }, 1000);
      if (breakTime <= 0) {
        let message = "The break time is: " + breakTime;
        console.log(message);
        clearInterval(pomodoro);
      }
    } else if (isStart && session <= -1 && breakTime < 0) {
      // clearInterval(pomodoro);
      // console.log("Time is up");
    } else {
      console.log("Something went wrong");
    }

    return () => {
      clearInterval(pomodoro);
    };
  }, [isStart, session, breakTime]);

  // Second useEffect: to change the timerType to breakTime when session is 0
  useEffect(() => {
    if (session <= -1) {
      setTimerType(breakTime);
    }
  }, [session]);

  return (
    <div className="h-screen bg-teal-700">
      <h1 className="pt-5 text-center font-bold text-white">Pomodoro Timer</h1>
      <div
        id="label"
        className="m-auto mt-3 grid w-60 grid-cols-2 rounded-md bg-red-800 p-5 px-2 text-sm font-bold text-white"
      >
        <div
          id="break"
          className="col-start-1 col-end-2 flex flex-col items-center justify-center"
        >
          <h2 id="break-label">Break Label</h2>
          <div id="break-container" className="flex flex-row ">
            <button id="break-decrement">&#8595;</button>
            <p id="break-length" className="mx-5">
              5
            </p>
            <button id="break-increment">&#8593;</button>
          </div>
        </div>
        <div
          id="session"
          className="col-start-2 col-end-3 flex flex-col items-center justify-center"
        >
          <h2 id="session-label">Session Label</h2>
          <div id="session-container" className="flex flex-row">
            <button id="session-decrement">&#8595;</button>
            <p id="session-length" className="mx-5">
              25
            </p>
            <button id="session-increment">&#8593;</button>
          </div>
        </div>
      </div>

      <div
        id="timer"
        className="mx-auto mt-3 flex w-60 flex-col items-center justify-center rounded-md border-4 p-8"
      >
        <h2 id="timer-label">Session</h2>
        <p id="time-left">{timerType}</p>
        <div id="timer-container" className="flex flex-row">
          <button
            id="start_stop"
            onClick={() => {
              setStart(!isStart);
              console.log(!isStart);
            }}
          >
            Start/Stop
          </button>
          <button id="reset" className="ml-5">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
