import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  // Things to do:
  // 1. Create a state that will track one cycle of the pomodoro timer
  // 2. Create a state that will track user input for how much cycle they want

  // a test to see if changes I made on the git profile matches my github profile
  // another test of the git profile changes

  // User focused time and break time input variable
  const [focusTimeInput, setFocusTimeInput] = useState(25);
  const [breakTimeInput, setBreakTimeInput] = useState(5);

  const [focusTime, setFocusTime] = useState(focusTimeInput * 60);
  const [breakTime, setBreakTime] = useState(breakTimeInput * 60);
  const [isStart, setStart] = useState(false);
  const [timerType, setTimerType] = useState(focusTime);

  // Minutes to seconds tracker
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [displayTime, setDisplayTime] = useState("25:00");

  // First useEffect: to start the timer
  useEffect(() => {
    let pomodoro;

    if (isStart && focusTime >= 0) {
      pomodoro = setInterval(() => {
        setFocusTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerType(focusTime);
      console.log(focusTime);
      if (focusTime <= 0) {
        let message = "The focus time is: " + focusTime;
        console.log(message);
        console.log("The second useEffect is running");
      }
    } else if (isStart && focusTime <= -1 && breakTime >= 0) {
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
    } else if (isStart && focusTime <= -1 && breakTime < 0) {
      // clearInterval(pomodoro);
      // console.log("Time is up");
    } else {
      console.log("Something went wrong");
    }

    return () => {
      clearInterval(pomodoro);
    };
  }, [isStart, focusTime, breakTime, focusTimeInput, breakTimeInput]);

  // Second useEffect: to change the timerType to breakTime when focusTime is 0
  useEffect(() => {
    if (focusTime <= -1) {
      setTimerType(breakTime);
    }
  }, [focusTime]);

  // Third useEffect: to turn the seconds into focusTime or breakTime minutes
  useEffect(() => {
    // write a function that will turn the seconds into minutes
    // write a function that will decrease the seconds by 1 each second
    if (timerType >= 0) {
      setMinutes(Math.floor(timerType / 60));
      setSeconds(timerType % 60);
      seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
      setDisplayTime(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    }
  }, [
    seconds,
    minutes,
    timerType,
    focusTime,
    breakTime,
    focusTimeInput,
    breakTimeInput,
  ]);

  // Fourth useEffect: to use the user input value to set the focusTime and breakTime
  useEffect(() => {
    setFocusTime(focusTimeInput * 60);
    setBreakTime(breakTimeInput * 60);
  }, [focusTimeInput, breakTimeInput]);

  // Function to increase and decrease the focusTime and breakTime
  const increaseFocusTime = () => {
    setFocusTimeInput(focusTimeInput + 1);
    setMinutes(Math.floor(timerType / 60));
    setSeconds(timerType % 60);
    setDisplayTime(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  };
  const decreaseFocusTime = () => {
    setFocusTimeInput(focusTimeInput - 1);
    setMinutes(Math.floor(timerType / 60));
    setSeconds(timerType % 60);
    setDisplayTime(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  };

  const increaseBreakTime = () => {
    setBreakTimeInput(breakTimeInput + 1);
    setMinutes(Math.floor(timerType / 60));
    setSeconds(timerType % 60);
    setDisplayTime(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  };
  const decreaseBreakTime = () => {
    setBreakTimeInput(breakTimeInput - 1);
    setMinutes(Math.floor(timerType / 60));
    setSeconds(timerType % 60);
    setDisplayTime(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  };

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
            <button id="break-decrement" onClick={decreaseBreakTime}>
              &#8595;
            </button>
            <p id="break-length" className="mx-5">
              {breakTimeInput}
            </p>
            <button id="break-increment" onClick={increaseBreakTime}>
              &#8593;
            </button>
          </div>
        </div>
        <div
          id="focus-time"
          className="col-start-2 col-end-3 flex flex-col items-center justify-center"
        >
          <h2 id="focus-label">Focus label</h2>
          <div id="focus-time-container" className="flex flex-row">
            <button id="focus-time-decrement" onClick={decreaseFocusTime}>
              &#8595;
            </button>
            <p id="focus-time-length" className="mx-5">
              {focusTimeInput}
            </p>
            <button id="focus-time-increment" onClick={increaseFocusTime}>
              &#8593;
            </button>
          </div>
        </div>
      </div>

      <div
        id="timer"
        className="mx-auto mt-3 flex w-60 flex-col items-center justify-center rounded-md border-4 p-8"
      >
        <h2 id="timer-label">{`${timerType === focusTime ? "Focus" : "Break"}`}</h2>
        <p id="time-left">{displayTime}</p>
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
